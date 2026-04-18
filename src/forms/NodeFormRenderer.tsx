import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, Controller, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import type { ZodSchema } from 'zod';
import type { FieldConfig } from '../types/workflow';
import { Plus, Trash2, Calendar as CalendarIcon, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface NodeFormRendererProps {
  fields: FieldConfig[];
  schema: ZodSchema<any>;
  defaultValues: any;
  onSubmit: (values: any) => void;
}

export function NodeFormRenderer({ fields, schema, defaultValues, onSubmit }: NodeFormRendererProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields: paramFields, append, remove } = useFieldArray({
    control,
    name: 'params' as any,
  });

  // Automatically submit on every change
  const watchedValues = useWatch({ control });
  useEffect(() => {
    const timer = setTimeout(() => {
      void handleSubmit(onSubmit)();
    }, 100);
    return () => clearTimeout(timer);
  }, [watchedValues, handleSubmit, onSubmit]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form className="space-y-6">
      <AnimatePresence mode="popLayout">
        {fields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {field.label} {field.required && <span className="text-accent">*</span>}
              </label>
            </div>

            <Controller
              name={field.name as any}
              control={control}
              render={({ field: { value, onChange, onBlur } }) => {
                const commonProps = {
                  value: value ?? '',
                  onChange,
                  onBlur,
                  className: cn(
                    "w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all",
                    errors[field.name] && "border-rose-500/50 ring-2 ring-rose-500/10"
                  ),
                  placeholder: field.placeholder,
                };

                if (field.type === 'textarea') {
                  return <textarea {...commonProps} rows={3} />;
                }

                if (field.type === 'select') {
                  return (
                    <select {...commonProps}>
                      <option value="" disabled className="bg-slate-950 text-slate-500">Select an option</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-slate-950">
                          {opt.label}
                        </option>
                      ) || null)}
                    </select>
                  );
                }

                if (field.type === 'boolean') {
                  return (
                    <button
                      type="button"
                      onClick={() => onChange(!value)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all w-full",
                        value 
                          ? "bg-accent/10 border-accent/30 text-accent font-bold" 
                          : "bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center",
                        value ? "border-accent bg-accent" : "border-slate-700"
                      )}>
                        {value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm">{value ? 'Enabled' : 'Disabled'}</span>
                    </button>
                  );
                }

                if (field.type === 'date') {
                  return (
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input type="date" {...commonProps} className={cn(commonProps.className, "pl-10")} />
                    </div>
                  );
                }

                if (field.type === 'keyValue') {
                  return (
                    <div className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {paramFields.map((item, paramIndex) => (
                          <motion.div 
                            key={item.id} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex gap-2 items-center"
                          >
                            <GripVertical className="w-3.5 h-3.5 text-slate-700 cursor-grab flex-shrink-0 hover:text-slate-400 transition-colors" />
                            <Controller
                              name={`params.${paramIndex}.key` as any}
                              control={control}
                              render={({ field: keyField }) => (
                                <input
                                  {...keyField}
                                  placeholder="Key"
                                  className="flex-1 bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                                />
                              )}
                            />
                            <Controller
                              name={`params.${paramIndex}.value` as any}
                              control={control}
                              render={({ field: valueField }) => (
                                <input
                                  {...valueField}
                                  placeholder="Value"
                                  className="flex-1 bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                                />
                              )}
                            />
                            <button
                              type="button"
                              onClick={() => remove(paramIndex)}
                              className="p-2 text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <button
                        type="button"
                        onClick={() => append({ key: '', value: '' })}
                        className="w-full py-2.5 border border-dashed border-slate-800 rounded-xl text-[10px] font-bold text-slate-500 hover:text-white hover:border-slate-600 hover:bg-slate-900 transition-all uppercase tracking-widest flex items-center justify-center gap-2 group"
                      >
                        <Plus className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" /> Add Parameter
                      </button>
                    </div>
                  );
                }

                return <input type={field.type === 'number' ? 'number' : 'text'} {...commonProps} />;
              }}
            />
            {errors[field.name] && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-bold text-rose-500 ml-1"
              >
                {errors[field.name]?.message as string}
              </motion.p>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </form>
  );
}
