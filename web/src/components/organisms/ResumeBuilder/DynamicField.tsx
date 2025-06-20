import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import FileField from "@/components/atoms/FileField";
import DateField from "@/components/atoms/DateField";
import RichTextEditor from "@/components/atoms/RichTextEditor";

import { useFormContext, Controller } from "react-hook-form";

interface Props {
  field: any;
  className: any
}

const DynamicField: React.FC<Props> = ({ field, className }) => {
  const { register, control } = useFormContext();

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <InputField
            label={field.label}
            type={field.type}
            {...register(field.name)}
            className="mt-1 block w-full"
          />
        );
      case "date":
        return (
          <DateField
            label={field.label}
            type={field.type}
            {...register(field.name)}
            className="mt-1 block w-full"
          />
        );
      case "select":
        return (
          <SelectField
            label={field.label}
            options={field.options || []}
            {...register(field.name)}
          />
        );
      case "file":
        return <FileField label={field.label} {...register(field.name)} />;
      case "rich-text":
        return (
          <div className={className}>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              {field.label}
            </label>
            <Controller
              name={field.name}
              control={control}
              rules={field.rules || {}}
              render={({ field: controllerField }) => (
                <RichTextEditor
                  value={controllerField.value}
                  onChange={controllerField.onChange}
                  placeholder={field.placeholder || "Enter content..."}
                />
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderField()}</>;
};

export default DynamicField;
