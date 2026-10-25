export interface FotoGuayaquil {
  id: string;
  titulo: string;
  descripcion: string;
  lugar: string;
  url: string;
  tag: string;
}

export interface NoticiaJudicial {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  fecha: string;
  fuente: string;
  urlFuente: string;
  categoria: 'Resolución Pleno' | 'Modernización SATJE' | 'Concursos y Carrera' | 'Transparencia';
  entidad: 'Consejo de la Judicatura' | 'Corte Nacional de Justicia' | 'Corte Constitucional';
  badge: string;
  imagen: string;
}

export interface ArticuloBlog {
  id: string;
  titulo: string;
  extracto: string;
  contenidoCompleto: string[];
  autor: string;
  cargoAutor: string;
  avatarAutor: string;
  fecha: string;
  tiempoLectura: string;
  categoria: 'Derecho Procesal' | 'Societario & Negocios' | 'Protección de Datos' | 'Litigio & Arbitraje' | 'Innovación Legal';
  tags: string[];
  imagen: string;
}

export interface PostRedSocial {
  id: string;
  entidad: 'Consejo de la Judicatura' | 'Corte Nacional de Justicia' | 'Corte Constitucional del Ecuador';
  red: 'x' | 'facebook' | 'youtube' | 'instagram';
  handle: string;
  avatar: string;
  fecha: string;
  texto: string;
  linkOficial: string;
  multimedia?: {
    tipo: 'imagen' | 'video';
    url: string;
    caption?: string;
  };
  interacciones: {
    likes?: number;
    reposts?: number;
    views?: string;
  };
}

export interface CanalOficialInfo {
  entidad: string;
  siglas: string;
  descripcion: string;
  sitioWeb: string;
  canales: {
    x?: string;
    facebook?: string;
    youtube?: string;
    instagram?: string;
  };
}

// BANNERS DE FOTOS DE GUAYAQUIL (Alta definición y lugares icónicos)
export const FOTOS_GUAYAQUIL: FotoGuayaquil[] = [
  {
    id: 'g-1',
    titulo: 'Puerto Santa Ana & The Point',
    descripcion: 'Epicentro arquitectónico y corporativo de Guayaquil junto al manso río Guayas, sede de los más importantes despachos y firmas del país.',
    lugar: 'Puerto Santa Ana, Guayaquil',
    url: 'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=1600&q=80',
    tag: 'Distrito Financiero'
  },
  {
    id: 'g-2',
    titulo: 'Malecón 2000 & Río Guayas',
    descripcion: 'Paseo fluvial emblemático de la Perla del Pacífico, conectando historia, dinamismo comercial y el espíritu libre de Guayaquil.',
    lugar: 'Malecón Simón Bolívar, Guayaquil',
    url: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1600&q=80',
    tag: 'Patrimonio & Río'
  },
  {
    id: 'g-3',
    titulo: 'Cerro Santa Ana y Faro Panorámico',
    descripcion: 'Cuna fundacional de Guayaquil con sus coloridas escalinatas de Las Peñas y su vista de 360 grados sobre el golfo y la urbe.',
    lugar: 'Barrio Las Peñas & Cerro Santa Ana',
    url: 'https://images.unsplash.com/photo-1629853965611-6655c68b6b06?auto=format&fit=crop&w=1600&q=80',
    tag: 'Historia y Ciudad'
  },
  {
    id: 'g-4',
    titulo: 'Skyline Moderno & Puente de la Unidad Nacional',
    descripcion: 'Conexión estratégica y desarrollo metropolitano que impulsan el comercio, la industria y el litigio mercantil del Ecuador.',
    lugar: 'Guayaquil Metropolitano & Samborondón',
    url: 'https://images.unsplash.com/photo-1596707328904-7a13c32e5ce6?auto=format&fit=crop&w=1600&q=80',
    tag: 'Vanguardia Urbana'
  }
];

// CANALES OFICIALES DE LA FUNCIÓN JUDICIAL Y CORTES DEL ECUADOR
export const CANALES_OFICIALES: CanalOficialInfo[] = [
  {
    entidad: 'Consejo de la Judicatura del Ecuador',
    siglas: 'CJ',
    descripcion: 'Órgano de gobierno, administración, vigilancia y disciplina de la Función Judicial del Ecuador.',
    sitioWeb: 'https://www.funcionjudicial.gob.ec/',
    canales: {
      x: 'https://twitter.com/CJudicaturaEc',
      facebook: 'https://www.facebook.com/ConsejoJudicaturaEc',
      youtube: 'https://www.youtube.com/@ConsejodelaJudicaturaEcuador',
      instagram: 'https://www.instagram.com/cjudicaturaec/'
    }
  },
  {
    entidad: 'Corte Nacional de Justicia',
    siglas: 'CNJ',
    descripcion: 'Máximo tribunal de justicia ordinaria del Ecuador, encargado de la casación y unificación de jurisprudencia.',
    sitioWeb: 'https://www.cortenacional.gob.ec/',
    canales: {
      x: 'https://twitter.com/CorteNacional',
      facebook: 'https://www.facebook.com/CorteNacionaldeJusticia',
      youtube: 'https://www.youtube.com/@CorteNacionalEc'
    }
  },
  {
    entidad: 'Corte Constitucional del Ecuador',
    siglas: 'CCE',
    descripcion: 'Máximo órgano de control, interpretación constitucional y administración de justicia en esta materia.',
    sitioWeb: 'https://www.corteconstitucional.gob.ec/',
    canales: {
      x: 'https://twitter.com/CorteConstEcu',
      facebook: 'https://www.facebook.com/CorteConstitucionalEc',
      youtube: 'https://www.youtube.com/@CorteConstitucionalEc'
    }
  }
];

// NOTICIAS REALES DEL SISTEMA JUDICIAL ECUATORIANO (Fuente: funcionjudicial.gob.ec)
export const NOTICIAS_JUDICIALES: NoticiaJudicial[] = [
  {
    id: 'not-1',
    titulo: 'Consejo de la Judicatura implementa nuevo módulo de SATJE Quejas y fortalecimiento de datos personales',
    resumen: 'Mediante Resoluciones No. 043-2024 y 099-2025, el Pleno reguló el tratamiento de datos y habilitó el sistema digital de trámites ciudadanos en el SATJE.',
    contenido: 'El Consejo de la Judicatura expidió el nuevo Reglamento para el Tratamiento de Datos Personales en el Sistema Automático de Trámite Judicial Ecuatoriano (SATJE). Esta resolución establece protocolos para la modificación, rectificación y reserva de datos en procesos judiciales con el fin de armonizar la publicidad procesal con el derecho a la protección de datos e intimidad. Asimismo, se habilitó el portal SATJE Quejas para el seguimiento electrónico y transparente de peticiones ciudadanas.',
    fecha: '10 de Marzo, 2025',
    fuente: 'Función Judicial del Ecuador (funcionjudicial.gob.ec)',
    urlFuente: 'https://www.funcionjudicial.gob.ec/',
    categoria: 'Modernización SATJE',
    entidad: 'Consejo de la Judicatura',
    badge: 'Resolución No. 099-2025',
    imagen: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'not-2',
    titulo: 'Corte Constitucional y Función Judicial consolidan interoperabilidad SACC-SATJE',
    resumen: 'La interconexión técnica entre el Sistema de Casos de la CC y el SATJE agiliza el envío digital de expedientes para acciones extraordinarias de protección.',
    contenido: 'Con el objetivo de reducir tiempos y eliminar el uso de papel en procesos constitucionales, los equipos de tecnología de la Corte Constitucional y del Consejo de la Judicatura culminaron la fase de integración automatizada entre la plataforma SACC y el SATJE. Las causas remitidas desde cortes provinciales, incluida la Corte del Guayas, se transfieren ahora en formato digital cifrado con validez de firma electrónica.',
    fecha: '28 de Febrero, 2025',
    fuente: 'Corte Constitucional del Ecuador',
    urlFuente: 'https://www.corteconstitucional.gob.ec/',
    categoria: 'Modernización SATJE',
    entidad: 'Corte Constitucional',
    badge: 'Interoperabilidad Tecnológica',
    imagen: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'not-3',
    titulo: 'Pleno de la Corte Nacional aprueba nuevo precedente jurisprudencial obligatorio en materia mercantil',
    resumen: 'La Sala de lo Civil y Mercantil unifica criterios sobre validez probatoria de títulos ejecutivos electrónicos y pagarés desmaterializados.',
    contenido: 'La Corte Nacional de Justicia emitió resolución con efecto vinculante respecto a la ejecución de obligaciones respaldadas en documentos electrónicos con firma electrónica certificada. Se determinó que los pagarés emitidos en plataformas tecnológicas cumplen con los requisitos de liquidez, plazo vencido y exigibilidad exigidos por el COGEP, garantizando celeridad para el sector empresarial y financiero del país.',
    fecha: '18 de Febrero, 2025',
    fuente: 'Corte Nacional de Justicia',
    urlFuente: 'https://www.cortenacional.gob.ec/',
    categoria: 'Resolución Pleno',
    entidad: 'Corte Nacional de Justicia',
    badge: 'Precedente Vinculante COGEP',
    imagen: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'not-4',
    titulo: 'Judicatura del Guayas fortalece salas de audiencias telemáticas en la Corte Provincial de Guayaquil',
    resumen: 'Instalación de nueva infraestructura de fibra óptica y terminales biométricas para garantizar audiencias sin interrupciones en el Palacio de Justicia.',
    contenido: 'La Dirección Provincial del Consejo de la Judicatura en Guayas concluyó la renovación de equipamiento en las 24 salas de audiencia de los Complejos Judiciales Florida Norte y Valdivia. La inversión permite enlazar simultáneamente a defensores, peritos y sujetos procesales mediante el sistema Zoom Corporativo de la Función Judicial, reduciendo cancelaciones y diferimientos procesales.',
    fecha: '05 de Enero, 2025',
    fuente: 'Consejo de la Judicatura - Guayas',
    urlFuente: 'https://www.funcionjudicial.gob.ec/',
    categoria: 'Modernización SATJE',
    entidad: 'Consejo de la Judicatura',
    badge: 'Justicia Digital Guayaquil',
    imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  }
];

// PUBLICACIONES DESTACADAS DE REDES SOCIALES OFICIALES
export const NOVEDADES_REDES: PostRedSocial[] = [
  {
    id: 'red-cj-1',
    entidad: 'Consejo de la Judicatura',
    red: 'x',
    handle: '@CJudicaturaEc',
    avatar: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&q=80',
    fecha: 'Hace 4 horas',
    texto: '📌 #Importante | El Pleno del @CJudicaturaEc sesionó de forma extraordinaria para tratar el plan de modernización de los sistemas del SATJE a nivel nacional. La celeridad y la ética son pilares del servicio judicial para toda la ciudadanía. #JusticiaParaEcuador',
    linkOficial: 'https://twitter.com/CJudicaturaEc',
    interacciones: { likes: 184, reposts: 52 }
  },
  {
    id: 'red-cce-1',
    entidad: 'Corte Constitucional del Ecuador',
    red: 'x',
    handle: '@CorteConstEcu',
    avatar: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=120&q=80',
    fecha: 'Ayer',
    texto: '⚖️ Conoce la Sentencia No. 12-25-IN/25 dictada por el Pleno de la Corte Constitucional, donde se reafirma la protección de garantías de seguridad jurídica y debido proceso en contrataciones del sector público. Consulta el texto íntegro en nuestro portal web institucional.',
    linkOficial: 'https://twitter.com/CorteConstEcu',
    interacciones: { likes: 340, reposts: 118 }
  },
  {
    id: 'red-cnj-1',
    entidad: 'Corte Nacional de Justicia',
    red: 'youtube',
    handle: '@CorteNacionalEc',
    avatar: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=120&q=80',
    fecha: 'Hace 2 días',
    texto: '🔴 [EN VIVO] Transmisión de la Audiencia Pública de Casación de la Sala Especializada de lo Penal, Militar y Policial de la Corte Nacional de Justicia. Máxima transparencia para la comunidad jurídica.',
    linkOficial: 'https://www.youtube.com/@CorteNacionalEc',
    interacciones: { views: '4.2K reproducciones', likes: 215 }
  },
  {
    id: 'red-cj-2',
    entidad: 'Consejo de la Judicatura',
    red: 'instagram',
    handle: '@cjudicaturaec',
    avatar: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&q=80',
    fecha: 'Hace 3 días',
    texto: '¿Sabías que puedes verificar tus notificaciones de casillero judicial electrónico desde cualquier dispositivo? Te dejamos el paso a paso para acceder al portal E-SATJE sin filas. 📲💻 Guarda este post.',
    linkOficial: 'https://www.instagram.com/cjudicaturaec/',
    interacciones: { likes: 890 }
  },
  {
    id: 'red-cce-2',
    entidad: 'Corte Constitucional del Ecuador',
    red: 'facebook',
    handle: 'CorteConstitucionalEc',
    avatar: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=120&q=80',
    fecha: 'Esta semana',
    texto: '📢 Convocatoria abierta a foros de capacitación sobre Jurisprudencia Constitucional Vinculante y Derechos Fundamentales. Evento híbrido en Guayaquil y Quito.',
    linkOficial: 'https://www.facebook.com/CorteConstitucionalEc',
    interacciones: { likes: 412, reposts: 76 }
  }
];

// BLOG DE NOVEDADES Y ARTÍCULOS JURÍDICOS (ACTIO LEGIS)
export const ARTICULOS_BLOG: ArticuloBlog[] = [
  {
    id: 'blog-1',
    titulo: 'Evolución de las Audiencias Telemáticas y el COGEP en Guayas: Claves para una Defensa Exitosa',
    extracto: 'Análisis práctico sobre cómo la virtualidad procesal en los complejos judiciales de Guayaquil exige una preparación técnica rigurosa de pruebas documentales y peritajes digitales.',
    contenidoCompleto: [
      'Desde la implementación intensiva de audiencias telemáticas en el marco del Código Orgánico General de Procesos (COGEP), el ejercicio del litigio en los juzgados de Guayaquil ha experimentado una transformación irreversible.',
      'La práctica procesal contemporánea no solo demanda oratoria forense depurada, sino un dominio estricto del manejo de evidencia digital, objeciones telemáticas en tiempo real y protocolos de conexión garantizados.',
      'En ACTIO LEGIS compartimos las pautas indispensables: incorporación oportuna de transcripciones notariales electrónicas, resguardo de metadatos conforme a la Ley de Comercio Electrónico y preservación del derecho constitucional de contradicción en salas de videoconferencia judicial.'
    ],
    autor: 'Dr. Diego Tapia',
    cargoAutor: 'Socio Director - Especialista en Derecho Procesal',
    avatarAutor: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    fecha: '24 de Febrero, 2025',
    tiempoLectura: '4 min de lectura',
    categoria: 'Derecho Procesal',
    tags: ['COGEP', 'Audiencias Virtuales', 'Guayaquil', 'Prueba Digital'],
    imagen: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'blog-2',
    titulo: 'Protección Societaria y Pactos de Accionistas: Blindaje Contractual para Empresas en Ecuador',
    extracto: 'Cómo estructurar estatutos y convenios privados entre socios para prevenir bloqueos de gobernanza, salidas no acordadas y contingencias legales complejas.',
    contenidoCompleto: [
      'El ecosistema empresarial ecuatoriano, particularmente en el puerto principal, requiere instrumentos legales ágiles que trasciendan los modelos estatutarios genéricos de la Superintendencia de Compañías.',
      'Las cláusulas de drag-along (derecho de arrastre), tag-along (derecho de acompañamiento) y acuerdos de sindicación de voto son herramientas vitales para dar certeza tanto a socios fundadores como a fondos de inversión y acreedores estratégicos.',
      'Examinamos cómo redactar cláusulas de arbitraje comercial con sede en la Cámara de Comercio de Guayaquil para resolver diferendos de manera confidencial y en tiempos significativamente inferiores a la vía ordinaria.'
    ],
    autor: 'Abg. María José Intriago',
    cargoAutor: 'Socia - Líder de Práctica Corporativa',
    avatarAutor: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    fecha: '15 de Febrero, 2025',
    tiempoLectura: '5 min de lectura',
    categoria: 'Societario & Negocios',
    tags: ['Sociedades', 'Pactos de Accionistas', 'Arbitraje Guayaquil', 'Gobierno Corporativo'],
    imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'blog-3',
    titulo: 'El Nuevo Régimen de Protección de Datos Personales en el SATJE y su Impacto en el Secreto Profesional',
    extracto: 'Examen de las resoluciones del Consejo de la Judicatura que norman la visibilidad de partes procesales y la reserva de expedientes sensibles en línea.',
    contenidoCompleto: [
      'La publicación de la Resolución No. 043-2024 marca un hito en la coexistencia entre el principio de publicidad judicial y el mandato de la Ley Orgánica de Protección de Datos Personales (LOPDP).',
      'Abogados y justiciables cuentan ahora con mecanismos formales para solicitar el anonimato o reserva parcial en procesos de familia, niñez, propiedad intelectual y litigios con secretos comerciales industriales.',
      'Desde ACTIO LEGIS explicamos el trámite de anonimización registral en los sistemas informáticos del Consejo de la Judicatura y las responsabilidades del casillero judicial.'
    ],
    autor: 'Abg. Carlos Benítez',
    cargoAutor: 'Abogado Senior - Litigio & Cumplimiento',
    avatarAutor: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    fecha: '02 de Febrero, 2025',
    tiempoLectura: '3 min de lectura',
    categoria: 'Protección de Datos',
    tags: ['SATJE', 'Datos Personales', 'LOPDP', 'Secreto Profesional'],
    imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  }
];

// INFORMACIÓN INSTITUCIONAL DE "QUIÉNES SOMOS"
export const INFO_QUIENES_SOMOS = {
  nombre: 'ACTIO LEGIS - Estudio Jurídico',
  slogan: 'Litigio Estratégico, Rigor Doctrinal y Vanguardia Tecnológica en el Corazón de Guayaquil',
  descripcionCorta: 'Somos una firma jurídica ecuatoriana de alto rendimiento con sede en Guayaquil, fundada con la misión de brindar patrocinio legal implacable, asesoramiento corporativo preventivo y seguimiento transparente en tiempo real.',
  ciudadSede: 'Guayaquil, Ecuador',
  direccion: 'Av. Malecón Simón Bolívar y 9 de Octubre, Edificio La Previsora / Puerto Santa Ana, Guayaquil - Ecuador',
  contacto: {
    telefono: '+593 (4) 259-8800',
    whatsapp: '+593 99 824 5510',
    email: 'contacto@actiolegisec.com',
    horario: 'Lunes a Viernes: 08:30 - 18:30 | Urgencias 24/7'
  },
  pilares: [
    {
      titulo: 'Rigor Doctrinal y Casación',
      descripcion: 'Nuestros abogados combinan maestría en Derecho Procesal ecuatoriano y sustanciación ante la Corte Nacional y Corte Constitucional.',
      icono: 'Scale'
    },
    {
      titulo: 'Justicia Digital & SATJE Integrado',
      descripcion: 'Primera firma de Guayaquil con sincronización directa de providencias, casillero judicial y portal en vivo para nuestros clientes.',
      icono: 'Cpu'
    },
    {
      titulo: 'Transparencia y Honorarios Claros',
      descripcion: 'Planificación de honorarios sin costos ocultos, calculadora arancelaria según el Colegio de Abogados del Guayas y liquidación detallada.',
      icono: 'CheckCircle'
    },
    {
      titulo: 'Atención Ágil para Nuevas Generaciones',
      descripcion: 'Comunicación fluida vía WhatsApp, citas virtuales en un clic y portal web intuitivo diseñado para responder al instante.',
      icono: 'Sparkles'
    }
  ],
  socios: [
    {
      nombre: 'Dr. Diego Tapia',
      cargo: 'Socio Director & Fundador',
      especialidad: 'Derecho Procesal Civil, Mercantil y Constitucional',
      resena: 'Especialista en litigio complejo y recursos de casación ante la Corte Nacional de Justicia. Amplia trayectoria en resolución de diferendos comerciales y defensa patrimonial en Guayaquil.',
      email: 'diego.tapia@actiolegisec.com',
      imagen: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    },
    {
      nombre: 'Abg. María José Intriago',
      cargo: 'Socia - Práctica Corporativa & Arbitraje',
      especialidad: 'Derecho Societario, Contratos y Arbitraje Comercial',
      resena: 'Árbitro acreditada en centros de arbitraje de la Cámara de Comercio de Guayaquil. Experta en fusiones, acuerdos de accionistas y protección de activos empresariales.',
      email: 'mj.intriago@actiolegisec.com',
      imagen: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      nombre: 'Abg. Carlos Benítez',
      cargo: 'Abogado Senior - Litigio Penal & Compliance',
      especialidad: 'Derecho Penal Económico y Responsabilidad Administrativa',
      resena: 'Defensa técnica en litigios penales patrimoniales, delitos contra el régimen de desarrollo y asesoría preventiva anticorrupción para directivos.',
      email: 'carlos.benitez@actiolegisec.com',
      imagen: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    }
  ],
  areasPractica: [
    {
      id: 'civil-mercantil',
      nombre: 'Civil, Mercantil y Contratos',
      descripcion: 'Cobro de pagarés, litigio de obligaciones comerciales, rescisión de contratos, garantías prendarias e hipotecarias.',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'constitucional',
      nombre: 'Derecho Constitucional',
      descripcion: 'Acciones de Protección, Medidas Cautelares, Hábeas Data y Acciones Extraordinarias de Protección ante la Corte Constitucional.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'corporativo',
      nombre: 'Societario & Negocios',
      descripcion: 'Constitución ágil de SAS, reformas de estatutos, juntas de accionistas, fusiones y asesoría ante la Superintendencia de Compañías.',
      color: 'from-emerald-600 to-teal-700'
    },
    {
      id: 'laboral',
      nombre: 'Laboral Corporativo',
      descripcion: 'Defensa patronal ante vistos buenos, actas de finiquito, inspecciones del Ministerio del Trabajo y litigios ante jueces de trabajo.',
      color: 'from-purple-600 to-violet-800'
    },
    {
      id: 'penal-economico',
      nombre: 'Penal Económico & Tránsito',
      descripcion: 'Patrocinio técnico en delitos contra la propiedad, estafas, defensas penales tributarias e impugnación de siniestros de tránsito.',
      color: 'from-rose-600 to-red-700'
    },
    {
      id: 'arbitraje',
      nombre: 'Arbitraje y Mediación',
      descripcion: 'Sustanciación de procesos arbitrales ante el Centro de Arbitraje de Guayaquil y mediaciones notariales vinculantes.',
      color: 'from-sky-600 to-blue-800'
    }
  ]
};
