import { colors } from "@cypress-design/css";
import chroma from "chroma-js";
import React, { FunctionComponent } from "react";

export const paletteList = (color: string) => {
  const keys = Object.keys(colors).filter((k) => k.startsWith(`$${color}`));
  return keys.map((k) => ({
    name: k.replace(`$${color}-`, ""),
    hex: colors[k],
  }));
};

export type Color = {
  hex: string;
  name: string;
};

interface ColorTileProps {
  color: Color;
}

interface ColorPaletteProps {
  colors: Color[];
  name: string;
}

export const ColorTile: FunctionComponent<ColorTileProps> = ({ color }) => {
  const style = {
    backgroundColor: color.hex,
    height: 64,
  };

  const textColor = chroma.hex(color.hex).luminance() > 0.5 ? "black" : "white";

  return (
    <>
      <div style={{ display: "inline-block", position: "relative" }}>
        <div style={style}></div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 4,
            color: textColor,
            fontSize: "1.5rem",
          }}
        >
          {color.name}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 4,
            color: textColor,
            fontSize: "1rem",
          }}
        >
          {color.hex}
        </div>
      </div>
    </>
  );
};

export const ColorPalette: FunctionComponent<ColorPaletteProps> = ({
  colors,
  name,
}) => {
  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${colors.length}, 1fr)`,
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h4>{name}</h4>
      <div style={style}>
        {colors.map((color, i) => (
          <ColorTile key={i} color={color} />
        ))}
      </div>
    </div>
  );
};

export const BrandColors: FunctionComponent = () => {
  const style = {
    width: "66vw",
    margin: "10px auto",
  };

  return (
    <div style={style}>
      <h1>Primary</h1>
      <ColorPalette name="Teal" colors={paletteList("teal")} />
      <ColorPalette name="Jade" colors={paletteList("jade")} />
      <ColorPalette name="Gray" colors={paletteList("gray")} />
      <h1>Secondary</h1>
      <ColorPalette name="Purple" colors={paletteList("purple")} />
      <ColorPalette name="Orange" colors={paletteList("orange")} />
      <ColorPalette name="Red" colors={paletteList("red")} />
      <ColorPalette name="Indigo" colors={paletteList("indigo")} />
      <h1>Tertiary</h1>
      <ColorPalette name="Fuchsia" colors={paletteList("fuchsia")} />
      <ColorPalette name="Yellow" colors={paletteList("yellow")} />
      <ColorPalette name="Green" colors={paletteList("green")} />
      <ColorPalette name="Magenta" colors={paletteList("magenta")} />
    </div>
  );
};
