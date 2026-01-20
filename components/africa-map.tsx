"use client";

import { useState, memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { countries, regions } from "@/lib/data/countries";
import { Loader2 } from "lucide-react";

// GeoJSON URL - using a reliable CDN source for world countries
const AFRICA_GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Map ISO-3 to ISO-2 codes for our country data
const iso3ToIso2: Record<string, string> = {
  DZA: "DZ", AGO: "AO", BEN: "BJ", BWA: "BW", BFA: "BF", BDI: "BI", CPV: "CV",
  CMR: "CM", CAF: "CF", TCD: "TD", COM: "KM", COG: "CG", COD: "CD", DJI: "DJ",
  EGY: "EG", GNQ: "GQ", ERI: "ER", SWZ: "SZ", ETH: "ET", GAB: "GA", GMB: "GM",
  GHA: "GH", GIN: "GN", GNB: "GW", CIV: "CI", KEN: "KE", LSO: "LS", LBR: "LR",
  LBY: "LY", MDG: "MG", MWI: "MW", MLI: "ML", MRT: "MR", MUS: "MU", MAR: "MA",
  MOZ: "MZ", NAM: "NA", NER: "NE", NGA: "NG", RWA: "RW", STP: "ST", SEN: "SN",
  SYC: "SC", SLE: "SL", SOM: "SO", ZAF: "ZA", SSD: "SS", SDN: "SD", TZA: "TZ",
  TGO: "TG", TUN: "TN", UGA: "UG", ZMB: "ZM", ZWE: "ZW", ESH: "EH",
};

// African ISO-3 codes
const africanCountries = new Set(Object.keys(iso3ToIso2));

// African numeric codes for TopoJSON
const africanNumericCodes = new Set([
  "012", "024", "204", "072", "854", "108", "132", "120", "140", "148", "174",
  "178", "180", "262", "818", "226", "232", "748", "231", "266", "270", "288",
  "324", "624", "384", "404", "426", "430", "434", "450", "454", "466", "478",
  "480", "504", "508", "516", "562", "566", "646", "678", "686", "690", "694",
  "706", "710", "728", "729", "834", "768", "788", "800", "894", "716", "732"
]);

// Map numeric to ISO-2 codes
const numericToIso2: Record<string, string> = {
  "012": "DZ", "024": "AO", "204": "BJ", "072": "BW", "854": "BF", "108": "BI",
  "132": "CV", "120": "CM", "140": "CF", "148": "TD", "174": "KM", "178": "CG",
  "180": "CD", "262": "DJ", "818": "EG", "226": "GQ", "232": "ER", "748": "SZ",
  "231": "ET", "266": "GA", "270": "GM", "288": "GH", "324": "GN", "624": "GW",
  "384": "CI", "404": "KE", "426": "LS", "430": "LR", "434": "LY", "450": "MG",
  "454": "MW", "466": "ML", "478": "MR", "480": "MU", "504": "MA", "508": "MZ",
  "516": "NA", "562": "NE", "566": "NG", "646": "RW", "678": "ST", "686": "SN",
  "690": "SC", "694": "SL", "706": "SO", "710": "ZA", "728": "SS", "729": "SD",
  "834": "TZ", "768": "TG", "788": "TN", "800": "UG", "894": "ZM", "716": "ZW",
  "732": "EH"
};

// Map ISO-2 codes to our country data
const countryByCode = new Map(countries.map((c) => [c.code.toUpperCase(), c]));

// Region colors
const regionColors: Record<string, { fill: string; hover: string }> = {
  "North Africa": { fill: "#F97316", hover: "#FB923C" },
  "West Africa": { fill: "#84CC16", hover: "#A3E635" },
  "Central Africa": { fill: "#DC2626", hover: "#EF4444" },
  "East Africa": { fill: "#22C55E", hover: "#4ADE80" },
  "Southern Africa": { fill: "#3B82F6", hover: "#60A5FA" },
};

// Distinct colors for each country
const countryColors: Record<string, string> = {
  // North Africa
  MA: "#8B5CF6", DZ: "#22C55E", TN: "#F97316", LY: "#EF4444", EG: "#FACC15", SD: "#60A5FA", EH: "#F97316",
  // West Africa
  MR: "#8B5CF6", SN: "#22C55E", GM: "#FACC15", GW: "#22C55E", GN: "#22C55E", SL: "#FACC15", LR: "#EF4444",
  CI: "#F97316", ML: "#FACC15", BF: "#84CC16", GH: "#22C55E", TG: "#F97316", BJ: "#22C55E", NE: "#3B82F6", NG: "#22C55E",
  // Central Africa
  TD: "#60A5FA", CM: "#F97316", CF: "#92400E", GQ: "#22C55E", GA: "#22C55E", CG: "#22C55E", CD: "#F97316", AO: "#8B5CF6", ST: "#22C55E",
  // East Africa
  SS: "#F9A8D4", ET: "#84CC16", ER: "#EF4444", DJ: "#FACC15", SO: "#22C55E", KE: "#F9A8D4", UG: "#F9A8D4",
  RW: "#3B82F6", BI: "#EF4444", TZ: "#22C55E", MW: "#F97316", MZ: "#F97316", MG: "#22C55E", KM: "#22C55E", SC: "#22C55E", MU: "#22C55E",
  // Southern Africa
  ZM: "#22C55E", ZW: "#F9A8D4", BW: "#FACC15", NA: "#22C55E", ZA: "#3B82F6", LS: "#F97316", SZ: "#EF4444", CV: "#3B82F6",
};

type Region = "all" | "North Africa" | "West Africa" | "Central Africa" | "East Africa" | "Southern Africa";

const AfricaMapInner = memo(function AfricaMapInner({
  selectedRegion,
  hoveredCountry,
  onHover,
  onClick,
}: {
  selectedRegion: Region;
  hoveredCountry: string | null;
  onHover: (code: string | null) => void;
  onClick: (code: string) => void;
}) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: [20, 0],
        scale: 350,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <ZoomableGroup center={[20, 0]} zoom={1} minZoom={0.8} maxZoom={4}>
        <Geographies geography={AFRICA_GEO_URL}>
          {({ geographies }) =>
            geographies
              .filter((geo) => {
                const numCode = geo.id || geo.properties?.ISO_N3;
                const iso3 = geo.properties?.ISO_A3;
                return africanNumericCodes.has(numCode) || africanCountries.has(iso3);
              })
              .map((geo) => {
                const numCode = geo.id || geo.properties?.ISO_N3;
                const iso3 = geo.properties?.ISO_A3;
                const iso2 = numericToIso2[numCode] || iso3ToIso2[iso3];
                const country = countryByCode.get(iso2);
                
                if (!country) return null;
                
                // Filter by region
                if (selectedRegion !== "all" && country.region !== selectedRegion) {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#e5e7eb"
                      stroke="#fff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none", opacity: 0.3 },
                        hover: { outline: "none", opacity: 0.3 },
                        pressed: { outline: "none", opacity: 0.3 },
                      }}
                    />
                  );
                }

                const isHovered = hoveredCountry === iso2;
                const baseColor = countryColors[iso2] || regionColors[country.region]?.fill || "#6B7280";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={baseColor}
                    stroke="#ffffff"
                    strokeWidth={isHovered ? 2 : 1}
                    onMouseEnter={() => onHover(iso2)}
                    onMouseLeave={() => onHover(null)}
                    onClick={() => onClick(iso2)}
                    style={{
                      default: {
                        outline: "none",
                        transition: "all 150ms",
                      },
                      hover: {
                        fill: `${baseColor}`,
                        outline: "none",
                        filter: "brightness(1.2)",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: baseColor,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
});

export function AfricaMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region>("all");

  const handleCountryClick = (code: string) => {
    router.push(`/country/${code.toLowerCase()}`);
  };

  const hoveredCountryData = hoveredCountry ? countryByCode.get(hoveredCountry) : null;

  return (
    <div className="relative w-full">
      {/* Region Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setSelectedRegion("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedRegion === "all"
              ? "bg-safari-gold text-ebony"
              : "bg-muted hover:bg-muted/80 text-foreground"
          }`}
        >
          All Regions
        </button>
        {regions.map((region) => (
          <button
            key={region.id}
            type="button"
            onClick={() => setSelectedRegion(region.name as Region)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              selectedRegion === region.name
                ? "text-white"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
            style={{
              backgroundColor: selectedRegion === region.name ? region.color : undefined,
            }}
          >
            <span
              className="w-3 h-3 rounded-full border border-white/30"
              style={{ backgroundColor: region.color }}
            />
            {region.name}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-b from-sky-100 to-blue-50 rounded-2xl overflow-hidden shadow-inner" style={{ height: "600px" }}>
        {/* Loading overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="text-center text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 opacity-30" />
            <p className="text-sm opacity-50">Loading map...</p>
          </div>
        </div>
        <AfricaMapInner
          selectedRegion={selectedRegion}
          hoveredCountry={hoveredCountry}
          onHover={setHoveredCountry}
          onClick={handleCountryClick}
        />

        {/* Tooltip */}
        {hoveredCountryData && (
          <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-border min-w-[220px] z-10 animate-in fade-in-0 slide-in-from-right-2 duration-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{hoveredCountryData.flagEmoji}</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {hoveredCountryData.name}
                </h3>
                <p className="text-xs text-muted-foreground">{hoveredCountryData.capital}</p>
              </div>
            </div>
            <div
              className="text-xs font-medium px-2 py-1 rounded-full inline-block mb-3"
              style={{
                backgroundColor: `${regionColors[hoveredCountryData.region]?.fill}20`,
                color: regionColors[hoveredCountryData.region]?.fill,
              }}
            >
              {hoveredCountryData.region}
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {hoveredCountryData.highlights.slice(0, 3).map((highlight) => (
                <span
                  key={highlight}
                  className="px-2 py-0.5 bg-muted text-xs rounded-full text-muted-foreground"
                >
                  {highlight}
                </span>
              ))}
            </div>
            <p className="text-xs text-safari-gold font-semibold">Click to explore</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {Object.entries(regionColors).map(([region, colors]) => (
          <div key={region} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: colors.fill }}
            />
            <span className="text-sm text-muted-foreground">{region}</span>
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-sm mt-4">
        Click any country to explore detailed guides | Scroll to zoom, drag to pan
      </p>
    </div>
  );
}
