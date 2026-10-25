/**
 * Cálculos Jurídicos especializados según normativa vigente
 */

export interface ResultadoLiquidacionLaboral {
  aniosServicio: number;
  fraccionMeses: number;
  indemnizacionDespido: number;
  bonificacionDesahucio: number;
  decimoTerceroProporcional: number;
  decimoCuartoProporcional: number;
  vacacionesNoGozadas: number;
  totalLiquidacion: number;
  baseCalculoMensual: number;
  fundamentoLegal: string[];
}

export function calcularLiquidacionLaboral(params: {
  remuneracionMensual: number;
  fechaIngreso: string; // YYYY-MM-DD
  fechaSalida: string; // YYYY-MM-DD
  tipoTerminacion: 'despido_intempestivo' | 'desahucio_trabajador' | 'acuerdo_partes' | 'visto_bueno';
  diasVacacionesPendientes?: number;
  salarioBasicoUnificado?: number; // Ecuador SBU actual ($460)
}): ResultadoLiquidacionLaboral {
  const {
    remuneracionMensual,
    fechaIngreso,
    fechaSalida,
    tipoTerminacion,
    diasVacacionesPendientes = 0,
    salarioBasicoUnificado = 460,
  } = params;

  const inicio = new Date(fechaIngreso);
  const fin = new Date(fechaSalida);

  const diffTime = Math.max(0, fin.getTime() - inicio.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const aniosServicio = Math.floor(diffDays / 365.25);
  const diasRestantes = diffDays - Math.floor(aniosServicio * 365.25);
  const fraccionMeses = Math.floor(diasRestantes / 30);

  const fundamentos: string[] = [];

  // 1. Indemnización por Despido Intempestivo (Art. 188 Código del Trabajo)
  let indemnizacionDespido = 0;
  if (tipoTerminacion === 'despido_intempestivo') {
    // Hasta 3 años de servicio: 3 meses de remuneración
    if (aniosServicio <= 3) {
      indemnizacionDespido = remuneracionMensual * 3;
    } else {
      // Más de 3 años: 1 mes de remuneración por cada año de servicio, sin superar 25 meses.
      // La fracción de año se considera como año completo
      const aniosParaCalculo = fraccionMeses > 0 || diasRestantes > 0 ? aniosServicio + 1 : aniosServicio;
      const factorAnios = Math.min(25, Math.max(3, aniosParaCalculo));
      indemnizacionDespido = remuneracionMensual * factorAnios;
    }
    fundamentos.push(
      `Art. 188 C.T.: Indemnización por despido intempestivo calculada sobre la última remuneración mensual completa.`
    );
  }

  // 2. Bonificación por Desahucio (Art. 185 Código del Trabajo)
  // 25% del equivalente a la última remuneración mensual por cada uno de los años completos de servicio
  let bonificacionDesahucio = 0;
  if (tipoTerminacion === 'despido_intempestivo' || tipoTerminacion === 'desahucio_trabajador' || tipoTerminacion === 'acuerdo_partes') {
    const aniosCompletos = Math.max(0, aniosServicio);
    bonificacionDesahucio = aniosCompletos * (remuneracionMensual * 0.25);
    fundamentos.push(
      `Art. 185 C.T.: Bonificación por desahucio equivalente al 25% de la última remuneración mensual por cada año completo (${aniosCompletos} años).`
    );
  }

  // 3. Proporcional Décimo Tercer Sueldo (Art. 111 Código del Trabajo)
  // Período de cómputo en Ecuador: 1 de diciembre al 30 de noviembre
  // Para cálculo estimativo proporcional: mes corriente y fracción
  const diasAnio = Math.min(360, (diffDays % 360) || 30);
  const decimoTerceroProporcional = Number(((remuneracionMensual / 360) * diasAnio).toFixed(2));
  fundamentos.push(`Art. 111 C.T.: Décimo tercera remuneración devengada proporcional al tiempo de servicio.`);

  // 4. Proporcional Décimo Cuarto Sueldo (Art. 113 Código del Trabajo)
  // 1 SBU anual proporcional a los días laborados en el período
  const decimoCuartoProporcional = Number(((salarioBasicoUnificado / 360) * diasAnio).toFixed(2));
  fundamentos.push(`Art. 113 C.T.: Décimo cuarta remuneración proporcional equivalente a fracción de 1 SBU ($${salarioBasicoUnificado}).`);

  // 5. Vacaciones no gozadas (Art. 69 y 71 Código del Trabajo)
  // Remuneración de 15 días anuales más días pendientes
  const valorDia = remuneracionMensual / 30;
  const vacacionesNoGozadas = Number((valorDia * Math.max(0, diasVacacionesPendientes)).toFixed(2));
  if (diasVacacionesPendientes > 0) {
    fundamentos.push(`Art. 69 C.T.: Compensación por ${diasVacacionesPendientes} días de vacaciones no gozadas.`);
  }

  const totalLiquidacion = Number(
    (
      indemnizacionDespido +
      bonificacionDesahucio +
      decimoTerceroProporcional +
      decimoCuartoProporcional +
      vacacionesNoGozadas
    ).toFixed(2)
  );

  return {
    aniosServicio,
    fraccionMeses,
    indemnizacionDespido,
    bonificacionDesahucio,
    decimoTerceroProporcional,
    decimoCuartoProporcional,
    vacacionesNoGozadas,
    totalLiquidacion,
    baseCalculoMensual: remuneracionMensual,
    fundamentoLegal: fundamentos,
  };
}

/**
 * Cálculo de Términos Procesales Judiciales (Días Hábiles)
 * Los plazos procesales excluyen sábados, domingos y feriados.
 * El cómputo inicia el día hábil siguiente a la notificación (Art. 73 COGEP).
 */
export function calcularTerminoProcesal(params: {
  fechaNotificacion: string; // YYYY-MM-DD
  diasTermino: number; // Ej: 3, 5, 10, 30 días
  feriadosAdicionales?: string[]; // Fechas YYYY-MM-DD
}): {
  fechaInicioComputo: string;
  fechaVencimiento: string;
  diasHabilesContados: number;
  diasCalendarioTranscurridos: number;
  detalleDias: { fecha: string; diaSemana: string; esHabil: boolean; motivo?: string }[];
} {
  const { fechaNotificacion, diasTermino, feriadosAdicionales = [] } = params;
  
  const diasSemanaNombres = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const feriadosSet = new Set(feriadosAdicionales);

  const fechaActual = new Date(fechaNotificacion + 'T12:00:00');
  
  // El primer día del término es el día hábil siguiente a la notificación
  let diasHabilesRestantes = diasTermino;
  let diasCalendario = 0;
  let fechaInicioStr = '';
  
  const detalleDias: { fecha: string; diaSemana: string; esHabil: boolean; motivo?: string }[] = [];

  // Avanzamos al día siguiente
  fechaActual.setDate(fechaActual.getDate() + 1);

  while (diasHabilesRestantes > 0) {
    diasCalendario++;
    const diaSemanaIdx = fechaActual.getDay();
    const esFinDeSemana = diaSemanaIdx === 0 || diaSemanaIdx === 6;
    const isoFecha = fechaActual.toISOString().split('T')[0];
    const esFeriado = feriadosSet.has(isoFecha);

    if (!esFinDeSemana && !esFeriado) {
      if (!fechaInicioStr) {
        fechaInicioStr = isoFecha;
      }
      diasHabilesRestantes--;
      detalleDias.push({
        fecha: isoFecha,
        diaSemana: diasSemanaNombres[diaSemanaIdx],
        esHabil: true,
      });
    } else {
      detalleDias.push({
        fecha: isoFecha,
        diaSemana: diasSemanaNombres[diaSemanaIdx],
        esHabil: false,
        motivo: esFinDeSemana ? 'Fin de semana' : 'Feriado judicial',
      });
    }

    if (diasHabilesRestantes > 0) {
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
  }

  return {
    fechaInicioComputo: fechaInicioStr || fechaNotificacion,
    fechaVencimiento: fechaActual.toISOString().split('T')[0],
    diasHabilesContados: diasTermino,
    diasCalendarioTranscurridos: diasCalendario,
    detalleDias,
  };
}

/**
 * Cálculo de Intereses Legales y Moratorios
 */
export function calcularInteresLegal(params: {
  capital: number;
  tasaAnualPorcentaje: number; // Ej: 9.85%
  diasMora: number;
}): {
  interesGenerado: number;
  montoTotal: number;
  interesDiario: number;
} {
  const { capital, tasaAnualPorcentaje, diasMora } = params;
  const tasaDecimal = tasaAnualPorcentaje / 100;
  // Interés simple comercial: I = (C * i * t) / 360
  const interesGenerado = Number(((capital * tasaDecimal * diasMora) / 360).toFixed(2));
  const montoTotal = Number((capital + interesGenerado).toFixed(2));
  const interesDiario = Number(((capital * tasaDecimal) / 360).toFixed(4));

  return {
    interesGenerado,
    montoTotal,
    interesDiario,
  };
}
