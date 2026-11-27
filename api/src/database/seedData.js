// Datos de la demo (RT-B11): 2 instructores con 3 cursos publicados cada uno y 3 estudiantes SIN inscripciones,
// para que cualquier estudiante empiece desde cero. Cada curso: 4 lecciones con video y 1 evaluación final.
// Videos: YouTube, en español, ≤ 5 min e insertables (verificados el 2026-11-15). Solo se guarda la URL (RF-08).
// Cada evaluación tiene 4 preguntas propias: con nota mínima 70 se reprueba con ≤ 2 aciertos y se aprueba con ≥ 3.

const leccion = (titulo, videoId, contenido) => ({ titulo, videoUrl: `https://www.youtube.com/watch?v=${videoId}`, contenido });
const pregunta = (enunciado, opciones, indiceCorrecto) => ({ enunciado, opciones, indiceCorrecto });

export const PASSWORD_DEMO = 'password123';

export const USUARIOS = [
  { nombre: 'Prof. García', email: 'garcia@miniaula.com', rol: 'instructor' },
  { nombre: 'Prof. Martínez', email: 'martinez@miniaula.com', rol: 'instructor' },
  { nombre: 'Ana López', email: 'ana@estudiante.com', rol: 'estudiante' },
  { nombre: 'Carlos Ruiz', email: 'carlos@estudiante.com', rol: 'estudiante' },
  { nombre: 'María Torres', email: 'maria@estudiante.com', rol: 'estudiante' },
];

export const CURSOS = [
  {
    titulo: 'JavaScript Fundamentos',
    descripcion: 'Variables, funciones y el DOM: las bases para dar vida a una página web.',
    categoria: 'Programación', nivel: 'Básico', instructor: 'garcia@miniaula.com',
    lecciones: [
      leccion('¿Qué es JavaScript?', 'riZbwRFMFuw', 'JavaScript es el lenguaje que se ejecuta en el navegador y vuelve interactiva una página. Junto con HTML (estructura) y CSS (estilo) forma la base de la web, y con Node.js también corre en servidores.'),
      leccion('Variables: var, let y const', 'B64V1f9I710', 'Una variable guarda un valor con un nombre. Usa const por defecto, let cuando el valor va a cambiar y evita var: su alcance es de función y provoca errores difíciles de ver.'),
      leccion('Funciones', '4EKCB6HbLbw', 'Una función agrupa instrucciones reutilizables: recibe parámetros, hace un trabajo y puede devolver un resultado con return. Las funciones cortas y con un solo propósito son más fáciles de probar.'),
      leccion('El DOM', '8FyiMzVbKLA', 'El DOM es el árbol de elementos de la página que el navegador entrega a JavaScript. Con querySelector seleccionas un elemento y con addEventListener respondes a clics o teclas.'),
    ],
    evaluacion: [
      pregunta('¿Dónde se ejecuta JavaScript originalmente?', ['En el navegador', 'En la impresora', 'En el router'], 0),
      pregunta('¿Qué palabra declara una variable que no se reasigna?', ['let', 'const', 'var'], 1),
      pregunta('¿Qué palabra devuelve un resultado desde una función?', ['break', 'continue', 'return'], 2),
      pregunta('¿Qué método responde a un clic?', ['getElementById', 'innerHTML', 'appendChild', 'addEventListener'], 3),
    ],
  },
  {
    titulo: 'React con Hooks',
    descripcion: 'Componentes, props y los hooks useState y useEffect para construir interfaces.',
    categoria: 'Programación', nivel: 'Intermedio', instructor: 'garcia@miniaula.com',
    lecciones: [
      leccion('¿Qué es React?', 'bvxm389cYVI', 'React es una biblioteca de JavaScript para construir interfaces con componentes. Cada componente describe una parte de la pantalla y React actualiza solo lo que cambia.'),
      leccion('Props: datos entre componentes', '3d5HfHo_eWY', 'Las props son los datos que un componente padre entrega a su hijo. Son de solo lectura: el hijo las usa para mostrarse, pero no las modifica.'),
      leccion('Estado con useState', 'OupP9MgZwL0', 'useState guarda un valor que cambia con el tiempo, como un contador o un formulario. Devuelve el valor y una función para actualizarlo; al llamarla, React vuelve a dibujar el componente.'),
      leccion('Efectos con useEffect', '8wuLNPgSCW8', 'useEffect ejecuta código después de dibujar: pedir datos a una API o suscribirse a eventos. Su lista de dependencias indica cuándo debe volver a ejecutarse.'),
    ],
    evaluacion: [
      pregunta('¿Cómo recibe datos un componente hijo?', ['Por props', 'Por CSS', 'Por la URL'], 0),
      pregunta('¿Qué hook guarda un valor y redibuja al cambiarlo?', ['useEffect', 'useState', 'useId'], 1),
      pregunta('¿Qué indica la lista de dependencias de useEffect?', ['El color del componente', 'El nombre del archivo', 'Cuándo vuelve a ejecutarse'], 2),
      pregunta('¿Qué es React?', ['Un servidor web', 'Una base de datos', 'Un sistema operativo', 'Una biblioteca de interfaces'], 3),
    ],
  },
  {
    titulo: 'SQL desde Cero',
    descripcion: 'Bases de datos relacionales y consultas con SELECT, WHERE y JOIN.',
    categoria: 'Ciencia de Datos', nivel: 'Básico', instructor: 'garcia@miniaula.com',
    lecciones: [
      leccion('Bases de datos relacionales', 'CBVp8sbo1w0', 'Una base de datos relacional guarda la información en tablas de filas y columnas. La clave primaria identifica cada fila y la clave foránea relaciona una tabla con otra.'),
      leccion('¿Qué es SQL?', 'UYqBb9jA_sI', 'SQL es el lenguaje estándar para consultar y modificar bases de datos relacionales. Sus comandos básicos son SELECT, INSERT, UPDATE y DELETE.'),
      leccion('Filtrar con WHERE', '5TYFc5dofBc', 'SELECT elige las columnas que quieres ver y WHERE filtra las filas que cumplen una condición, por ejemplo precio > 100. Las condiciones se combinan con AND y OR.'),
      leccion('Unir tablas con JOIN', 'gy5yOObm24s', 'JOIN combina filas de dos tablas que comparten una clave. INNER JOIN devuelve solo las coincidencias; LEFT JOIN conserva todas las filas de la tabla de la izquierda.'),
    ],
    evaluacion: [
      pregunta('¿Qué comando lee datos de una tabla?', ['SELECT', 'INSERT', 'DROP'], 0),
      pregunta('¿Qué identifica cada fila de una tabla?', ['El nombre de la tabla', 'La clave primaria', 'Un comentario'], 1),
      pregunta('¿Qué cláusula filtra filas?', ['ORDER BY', 'GROUP BY', 'WHERE'], 2),
      pregunta('¿Qué JOIN devuelve solo las filas que coinciden en ambas tablas?', ['LEFT JOIN', 'RIGHT JOIN', 'UNION', 'INNER JOIN'], 3),
    ],
  },
  {
    titulo: 'Diseño UX/UI',
    descripcion: 'Experiencia de usuario, wireframes y prototipos para diseñar productos fáciles de usar.',
    categoria: 'Diseño', nivel: 'Intermedio', instructor: 'martinez@miniaula.com',
    lecciones: [
      leccion('UX y UI: la diferencia', 'Js0f7wKjoaE', 'UX (experiencia de usuario) estudia cómo se siente una persona al usar un producto; UI (interfaz) es lo que ve y toca: colores, tipografía y botones. Un buen producto necesita ambas.'),
      leccion('Principios de UX', '2NPAra4GTas', 'Diseñar con el usuario en el centro es investigar sus necesidades, reducir los pasos de cada tarea y responder con claridad a cada acción. La consistencia evita aprender dos veces lo mismo.'),
      leccion('Wireframes', 'yqt_MEOGQEE', 'Un wireframe es un boceto de baja fidelidad con la estructura de una pantalla, sin colores ni imágenes finales. Sirve para acordar qué va dónde antes de invertir en el diseño visual.'),
      leccion('Prototipos', 'gxP2dqeKrdY', 'Un prototipo simula el producto para probarlo con usuarios antes de programarlo. Va del papel (baja fidelidad) a lo interactivo (alta fidelidad) según lo que necesites validar.'),
    ],
    evaluacion: [
      pregunta('¿Qué estudia la UX?', ['La experiencia de quien usa el producto', 'Solo los colores', 'El precio del producto'], 0),
      pregunta('¿Qué es un wireframe?', ['El logotipo final', 'Un boceto de la estructura', 'Una base de datos'], 1),
      pregunta('¿Para qué sirve un prototipo?', ['Para facturar', 'Para alojar la web', 'Para probar con usuarios antes de programar'], 2),
      pregunta('¿Qué forma parte de la UI?', ['Las entrevistas', 'El presupuesto', 'El servidor', 'Los botones y la tipografía'], 3),
    ],
  },
  {
    titulo: 'Marketing Digital',
    descripcion: 'Atrae clientes en internet con SEO, redes sociales y un embudo de ventas claro.',
    categoria: 'Marketing', nivel: 'Básico', instructor: 'martinez@miniaula.com',
    lecciones: [
      leccion('¿Qué es el marketing digital?', 'u2d9w0zdDWM', 'El marketing digital promociona productos en canales en línea: buscadores, redes sociales, correo y sitios web. Su ventaja es que todo se mide, así sabes qué acción trae resultados.'),
      leccion('SEO: aparecer en Google', 'clANSgJu14k', 'SEO es optimizar un sitio para aparecer en los resultados orgánicos (sin pagar) de un buscador. Influyen el contenido útil, las palabras clave, la velocidad y los enlaces de otros sitios.'),
      leccion('Marketing en redes sociales', 'acP9f6ZORf4', 'El marketing en redes construye comunidad publicando contenido de valor de forma constante. Cada red tiene su público y su formato: conviene elegir pocas y hacerlo bien.'),
      leccion('El embudo de ventas', 'MX44zr4tVUQ', 'El embudo describe el camino del cliente: atención, interés, deseo y acción (modelo AIDA). En cada etapa quedan menos personas, por eso se mide cuántas avanzan a la siguiente.'),
    ],
    evaluacion: [
      pregunta('¿Qué significa la última A del modelo AIDA?', ['Acción', 'Ahorro', 'Archivo'], 0),
      pregunta('¿Qué ventaja tiene el marketing digital?', ['Siempre es gratis', 'Todo se puede medir', 'No necesita contenido'], 1),
      pregunta('¿Qué busca el SEO?', ['Diseñar logotipos', 'Contratar personal', 'Aparecer en resultados sin pagar'], 2),
      pregunta('¿Qué conviene en redes sociales?', ['Estar en todas sin plan', 'Publicar una sola vez', 'Comprar seguidores', 'Elegir pocas redes y ser constante'], 3),
    ],
  },
  {
    titulo: 'Fundamentos de IA',
    descripcion: 'Qué es la inteligencia artificial, cómo aprenden las máquinas y qué hace la IA generativa.',
    categoria: 'Inteligencia Artificial', nivel: 'Básico', instructor: 'martinez@miniaula.com',
    lecciones: [
      leccion('¿Qué es la inteligencia artificial?', '-NXUk2P2qKc', 'La inteligencia artificial crea sistemas que hacen tareas que antes requerían a una persona: reconocer imágenes, traducir o recomendar. No piensa como un humano: encuentra patrones en datos.'),
      leccion('Machine learning', 'oGdmSshtVWw', 'El aprendizaje automático entrena un modelo con ejemplos en lugar de programar cada regla. Con más datos de calidad predice mejor; con datos sesgados repite esos sesgos.'),
      leccion('Redes neuronales', 'czMOenEc8fI', 'Una red neuronal tiene capas de nodos conectados que ajustan sus pesos durante el entrenamiento. Cuando tiene muchas capas se habla de aprendizaje profundo (deep learning).'),
      leccion('IA generativa', 'rwFnTJ3Mp9g', 'La IA generativa crea contenido nuevo (texto, imágenes o audio) a partir de lo que aprendió de grandes volúmenes de datos. Puede sonar segura y equivocarse: sus respuestas se verifican.'),
    ],
    evaluacion: [
      pregunta('¿Qué crea la IA generativa?', ['Contenido nuevo', 'Solo hojas de cálculo', 'Piezas de hardware'], 0),
      pregunta('¿Cómo aprende un modelo de machine learning?', ['Con reglas escritas una a una', 'A partir de ejemplos', 'Sin ningún dato'], 1),
      pregunta('¿Qué se ajusta al entrenar una red neuronal?', ['El monitor', 'El teclado', 'Los pesos de sus conexiones'], 2),
      pregunta('¿Qué se hace con una respuesta de una IA?', ['Copiarla sin leer', 'Publicarla de inmediato', 'Ignorar la fuente', 'Verificarla'], 3),
    ],
  },
];
