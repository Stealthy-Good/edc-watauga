import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Watauga County Economic Development - Where Mountains Meet Innovation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #143D30 0%, #1B4D3E 50%, #1B4D3E 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#C75B12",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.7)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "24px",
              display: "flex",
            }}
          >
            Watauga County EDC
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              marginBottom: "20px",
              display: "flex",
            }}
          >
            Where Mountains Meet Innovation
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "700px",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            Outdoor adventure. Academic excellence. Economic opportunity.
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "3px",
              background: "#C75B12",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: "1px",
              display: "flex",
            }}
          >
            wataugaedc.org
          </div>
          <div
            style={{
              width: "32px",
              height: "3px",
              background: "#C75B12",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
