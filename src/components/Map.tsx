'use client';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Resort } from '@/lib/resorts_data';
import { WeatherData, calculateConditionScore } from '@/lib/scoring';
import { useEffect } from 'react';

export interface MapProps {
    resorts: (Resort & { weather: WeatherData })[];
    selectedResort: (Resort & { weather: WeatherData }) | null;
    favorites: Set<string>;
    onToggleFavorite: (id: string) => void;
    onResortClick?: (resort: Resort & { weather: WeatherData }) => void;
}

// 地図の移動を制御するサブコンポーネント
function MapController({ selectedResort }: { selectedResort: (Resort & { weather: WeatherData }) | null }) {
    const map = useMap();

    useEffect(() => {
        if (selectedResort) {
            map.flyTo([selectedResort.lat, selectedResort.long], 10, {
                animate: true,
                duration: 1.5
            });
        }
    }, [selectedResort, map]);

    return null;
}

// レベル別の5段階カラー
const getScoreColor = (score: number) => {
    if (score >= 80) return '#ffd700'; // ゴールド（でんせつきゅう）
    if (score >= 60) return '#44ff88'; // 緑（ベテラン）
    if (score >= 40) return '#66bbff'; // 青（いっぱしの）
    if (score >= 20) return '#cc88ff'; // 紫（みならい）
    return '#8899bb';                   // グレー（かけだし）
};

// ▼マーカー + ラベルのアイコン生成
const createDQMarkerIcon = (score: number, name: string) => {
    const color = getScoreColor(score);
    const html = `
    <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 130px;
        filter: drop-shadow(0 2px 6px rgba(0,0,0,0.9));
        cursor: pointer;
        transform: translate(-50%, -100%);
    ">
        <div style="
            background: rgba(0, 0, 0, 0.85);
            border: 2px solid ${color};
            border-radius: 4px;
            padding: 3px 6px;
            font-family: 'DotGothic16', monospace;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 0 8px ${color}44;
        ">
            <span style="
                font-size: 11px;
                font-weight: bold;
                color: #e0e0e0;
                line-height: 1.3;
                text-align: center;
                white-space: pre-wrap;
                word-break: keep-all;
                text-shadow: 1px 1px 0 #000;
            ">${name}</span>
            <span style="
                font-size: 10px;
                font-weight: bold;
                color: ${color};
                line-height: 1.2;
                margin-top: 2px;
            ">Lv${score}</span>
        </div>
        <span style="
            font-size: 20px;
            color: ${color};
            line-height: 1;
            margin-top: -2px;
            text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        ">▼</span>
    </div>
    `;

    return L.divIcon({
        className: 'custom-score-marker',
        html,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
    });
};

function ResortMarker({ resort, onResortClick }: {
    resort: Resort & { weather: WeatherData },
    onResortClick?: (resort: Resort & { weather: WeatherData }) => void
}) {
    const condition = calculateConditionScore(resort.weather);
    const markerIcon = createDQMarkerIcon(condition.score, resort.name);

    return (
        <Marker
            position={[resort.lat, resort.long]}
            icon={markerIcon}
            eventHandlers={{
                click: () => {
                    if (onResortClick) {
                        onResortClick(resort);
                    }
                }
            }}
        />
    );
}

const JAPAN_CENTER: [number, number] = [36.2048, 138.2529];

export default function Map({ resorts, selectedResort, favorites, onToggleFavorite, onResortClick }: MapProps) {
    return (
        <MapContainer
            center={JAPAN_CENTER}
            zoom={5}
            style={{ height: '100%', width: '100%', background: '#02081a' }}
            zoomControl={false}
            className="dq-ultimate-map"
        >
            {/* 強制的に色数を減らすスーファミ風ポスタライズフィルター */}
            <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
                <defs>
                    <filter id="retro-posterize" colorInterpolationFilters="sRGB">
                        <feComponentTransfer>
                            {/* R/G/Bの階調を極端に落としてベタ塗りのようなルックにする */}
                            <feFuncR type="discrete" tableValues="0.1 0.4 0.7 0.9" />
                            <feFuncG type="discrete" tableValues="0.2 0.5 0.8 1.0" />
                            <feFuncB type="discrete" tableValues="0.3 0.6 0.9 1.0" />
                        </feComponentTransfer>
                    </filter>
                </defs>
            </svg>

            {/* 文字のない衛星写真タイル（地形のみ） */}
            <TileLayer
                attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                className="dq-satellite-tiles"
            />

            <MapController selectedResort={selectedResort} />

            {resorts.map((resort) => (
                <ResortMarker
                    key={resort.id}
                    resort={resort}
                    onResortClick={onResortClick}
                />
            ))}
        </MapContainer>
    );
}
