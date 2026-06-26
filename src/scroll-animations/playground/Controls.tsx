import type { ControlConfig, AnimationProps } from '../types';

interface ControlsProps {
  configs: ControlConfig[];
  values: AnimationProps;
  onChange: (key: string, value: unknown) => void;
}

export function Controls({ configs, values, onChange }: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
      {configs.map((control) => {
        const value = values[control.key as keyof AnimationProps] ?? control.default;
        return (
          <div key={control.key} className="flex flex-col gap-1 min-w-[140px]">
            <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {control.label}
            </label>
            {control.type === 'checkbox' && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!value}
                  onChange={(e) => onChange(control.key, e.target.checked)}
                  className="rounded border-neutral-300 dark:border-neutral-700"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {value ? 'On' : 'Off'}
                </span>
              </label>
            )}
            {control.type === 'slider' && (
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={control.min ?? 0}
                  max={control.max ?? 100}
                  step={control.step ?? 1}
                  value={value as number}
                  onChange={(e) => onChange(control.key, parseFloat(e.target.value))}
                  className="w-24 accent-neutral-800 dark:accent-white"
                />
                <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 w-8 text-right">
                  {value as number}
                </span>
              </div>
            )}
            {control.type === 'select' && (
              <select
                value={value as string}
                onChange={(e) => onChange(control.key, e.target.value)}
                className="text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded px-2 py-1"
              >
                {control.options?.map((opt) => (
                  <option key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        );
      })}
    </div>
  );
}
