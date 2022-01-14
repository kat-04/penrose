import { constOf } from "engine/Autodiff";
import { IFill, INamed, IPoly, IScale, IShape, IStroke } from "types/shapes";
import {
  BoolV,
  Canvas,
  FloatV,
  PtListV,
  sampleColor,
  sampleNoPaint,
  sampleZero,
  StrV,
} from "./Samplers";

export interface IPolygon extends INamed, IStroke, IFill, IScale, IPoly {}

export const samplePolygon = (_canvas: Canvas): IPolygon => ({
  name: StrV("defaultPolygon"),
  style: StrV(""),
  strokeWidth: sampleZero(),
  strokeStyle: StrV("solid"),
  strokeColor: sampleNoPaint(),
  strokeDashArray: StrV(""),
  fillColor: sampleColor(),
  scale: FloatV(constOf(1)),
  points: PtListV(
    [
      [0, 0],
      [0, 10],
      [10, 0],
    ].map((p) => p.map(constOf))
  ),
  ensureOnCanvas: BoolV(true),
});

export type Polygon = IShape & { shapeType: "Polygon" } & IPolygon;

export const makePolygon = (
  canvas: Canvas,
  properties: Partial<IPolygon>
): Polygon => ({
  ...samplePolygon(canvas),
  ...properties,
  shapeType: "Polygon",
});
