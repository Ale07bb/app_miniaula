import { z } from 'zod';

// .strict(): rechaza cualquier campo que no esté aquí (p. ej. que intenten mandar `id` o `passwordHash`),
// como ya hacen el resto de los esquemas del proyecto (ver schemas/AGENTS.md).
export const registerSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(100),
  rol: z.enum(['estudiante', 'instructor'], { message: 'El rol debe ser estudiante o instructor' }),
}).strict();

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
}).strict();
