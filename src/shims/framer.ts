import React from "react";
export * from "framer-motion";

export const addPropertyControls = (_component: any, _controls: any) => {};

export const ControlType = {
  Number: "Number",
  Boolean: "Boolean",
  String: "String",
  Enum: "Enum",
  SegmentedEnum: "SegmentedEnum",
  Color: "Color",
  Image: "Image",
  File: "File",
  ComponentInstance: "ComponentInstance",
  Array: "Array",
  Object: "Object",
  FusedNumber: "FusedNumber",
  Transition: "Transition",
  EventHandler: "EventHandler",
  Link: "Link",
  Date: "Date",
};

export const RenderTarget = {
  current: () => "canvas",
  hasTarget: () => false,
  canvas: "canvas",
  export: "export",
  preview: "preview",
};

export const Color = (color?: string) => color || "#000000";
Color.toRgb = (_color: string) => ({ r: 0, g: 0, b: 0, a: 1 });
Color.toHsl = (_color: string) => ({ h: 0, s: 0, l: 0, a: 1 });

export const Frame = ({ children, ...props }: any) => React.createElement("div", props, children);
