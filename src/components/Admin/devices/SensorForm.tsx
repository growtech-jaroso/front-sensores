import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckCircle, XCircle} from "lucide-react";
import axiosClient from "../../../api/axiosClient.ts";
import {useState} from "react";
import {CreateDeviceFormType, CreateDeviceShema} from "../../../schemas/sensor.schema.ts";
import InputSelect from "../../Inputs/InputSelect.tsx";
import {SensorType} from "../../../types/sensorType.ts";
import {SensorUnit} from "../../../types/sensorUnit.ts";

interface Props {
  plantationId: string;
}

export default function SensorForm({ plantationId }: Props) {

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit: SubmitHandler<CreateDeviceFormType> = async (data) => {
    setSubmitting(true);
    setMessage(null);

    try {
      await axiosClient.post(`/plantations/${plantationId}/sensors`, data);
      setMessage({ type: "success", text: "Sensor creado correctamente." });
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
    } catch (error: any) {
      const rawMessage = "Error al crear el sensor.";
      setMessage({ type: "error", text: rawMessage });
    } finally {
      setSubmitting(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDeviceFormType>({
    resolver: zodResolver(CreateDeviceShema),
  });



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
      <InputSelect
        register={register("sensor_type")}
        errors={errors.sensor_type}
        label="Seleccione el tipo de sensor"
        options={[
          { value: SensorType.AMBIENT_HUMIDITY, label: "Humedad Ambiental" },
          { value: SensorType.AMBIENT_TEMPERATURE, label: "Temperatura Ambiental" },
          { value: SensorType.ATMOSPHERIC_PRESSURE, label: "Presión Atmosférica" }
        ]}
      />

      <InputSelect
        register={register("sensor_unit")}
        errors={errors.sensor_unit}
        label="Seleccione la unidad de medida del sensor"
        options={[
          { value: SensorUnit.PERCENTAGE, label: "Porcentaje" },
          { value: SensorUnit.CELSIUS, label: "Grados Celsius" },
          { value: SensorUnit.MBAR, label: "Milibar" }
        ]}
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
      >
        {submitting ? "Creando..." : "Crear sensor"}
      </button>

      {message && (
        <div
          className={`flex items-center gap-2 mt-4 text-sm px-4 py-2 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span>{message.text}</span>
        </div>
      )}
    </form>
  )
}