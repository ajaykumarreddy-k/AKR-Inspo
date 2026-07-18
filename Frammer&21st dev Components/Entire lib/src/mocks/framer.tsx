import React from 'react';

export const ControlType = {
  Boolean: "Boolean",
  Number: "Number",
  String: "String",
  Enum: "Enum",
  Color: "Color",
  Image: "Image",
  File: "File",
  ComponentInstance: "ComponentInstance",
  Array: "Array",
  Object: "Object",
};

export const addPropertyControls = (component: any, controls: any) => {
  const extractDefaults = (ctrls: any) => {
    const props: any = {};
    for (const key in ctrls) {
      if (ctrls[key].type === "Object" && ctrls[key].controls) {
        props[key] = extractDefaults(ctrls[key].controls);
      } else if (ctrls[key].type === "Array") {
        const defaultItem = ctrls[key].control?.type === "ComponentInstance" ? <div style={{ padding: 20, background: 'rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: 8, border: '1px solid rgba(255, 255, 255, 0.2)' }}>List Item</div> : null;
        props[key] = ctrls[key].defaultValue !== undefined ? ctrls[key].defaultValue : [defaultItem, defaultItem, defaultItem];
      } else if (ctrls[key].type === "ComponentInstance") {
        props[key] = <div style={{ padding: 40, background: 'linear-gradient(135deg, #FF007A, #7928CA)', color: 'white', borderRadius: 16, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(121, 40, 202, 0.4)' }}>Component Child</div>;
      } else if (ctrls[key].type === "Image") {
        props[key] = ctrls[key].defaultValue !== undefined ? ctrls[key].defaultValue : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
      } else if (ctrls[key].type === "Enum") {
        props[key] = ctrls[key].defaultValue !== undefined ? ctrls[key].defaultValue : (ctrls[key].options ? ctrls[key].options[0] : "");
      } else if (ctrls[key].defaultValue !== undefined) {
        props[key] = ctrls[key].defaultValue;
      } else {
        // Fallbacks for undefined defaultValues
        if (ctrls[key].type === "String") props[key] = "Placeholder Text";
        if (ctrls[key].type === "Number") props[key] = 0;
        if (ctrls[key].type === "Boolean") props[key] = false;
        if (ctrls[key].type === "Color") props[key] = "#FFFFFF";
        if (ctrls[key].type === "Date") props[key] = new Date().toISOString();
      }
    }
    return props;
  };

  component.defaultProps = {
    ...component.defaultProps,
    ...extractDefaults(controls)
  };
};

export const Color = {
  toRgbString: (color: string) => color,
  toHexString: (color: string) => color,
};

export const Frame = (props: any) => {
  return <div {...props} />;
};

export const RenderTarget = {
  current: "canvas",
};

// Also mock useChild from framer URL since some components import from there
export const useChild = () => null;
export const childControl = () => null;
export const useClonedChild = (child: any) => child;
