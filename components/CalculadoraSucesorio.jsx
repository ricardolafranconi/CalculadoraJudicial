import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  Stack,
  HStack,
  ButtonGroup,
  Checkbox,
} from "@chakra-ui/react";

import {
  CalculatorResultsContext,
  useCalculatorResults,
} from "../contextApi/CalculatorResultsContext";
import { jsPDF } from "jspdf";


// const optionsB2 = ["ORDINARIO", "ABREVIADO", "EJECUTIVO"];
// const optionsB3 = ["ACTOR", "DEMANDADO"];
// const optionsB4 = ["ADMISIÓN TOTAL", "ADMISIÓN PARCIAL", "RECHAZO TOTAL"];


 function baseRegulatoria(B5){
    return B5
}
//   

// function honorariosMini(B2, jus) {
//   const ORDINARIO = jus * 20;
//   const ABREVIADO = jus * 15;
//   const EJECUTIVO = jus * 10;

//   return B2 === "ORDINARIO"
//     ? ORDINARIO
//     : B2 === "ABREVIADO"
//     ? ABREVIADO
//     : B2 === "EJECUTIVO"
//     ? EJECUTIVO
//     : 0;
// }

function calculateMinimoEscala(unidadesEconomicas) {
  if (unidadesEconomicas < 5) return 0.2;
  if (unidadesEconomicas < 15) return 0.18;
  if (unidadesEconomicas < 30) return 0.16;
  if (unidadesEconomicas < 50) return 0.14;
  if (unidadesEconomicas < 100) return 0.12;
  return 0.1;
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

function CalculadoraSucesorio() {
  const [stages, setStages] = useState({
    EscritoDH: false,
    AutoDH: false,
    AperturaSucesorio: false,
    Particion: false,
    Inventario: false
  });

  const [totalStagesPercentage, setTotalStagesPercentage] = useState(0);
  const [inventarioHonorario, setInventarioHonorario] = useState(0)

  useEffect(() => {
    let newPercentage = 0;
    let newInventario = 0;
    if (stages.EscritoDH) newPercentage += 25;
    if (stages.AutoDH) newPercentage += 25;
    if (stages.AperturaSucesorio) newPercentage += 25;
    if (stages.Particion) newPercentage += 25;
    if (stages.Inventario) newInventario = B5*0.02;
    setTotalStagesPercentage(newPercentage / 100);
    setInventarioHonorario(newInventario)
  }, [stages]);

  const handleStageChange = (stage) => {
    setStages((prevStages) => ({
      ...prevStages,
      [stage]: !prevStages[stage],
    }));
  };

  const { setResults } = useCalculatorResults();
  // const [B2, setB2] = useState("ORDINARIO");
  // const [B3, setB3] = useState("ACTOR");
  // const [B4, setB4] = useState("ADMISIÓN TOTAL");
  const [B5, setB5] = useState(0);
  const [base, setBase] = useState(0);
  const [puntoMedio, setPuntoMedio] = useState();
  const[escalaSinIncidente, setEscalaSinIncidente] = useState()
  const [maximoEscala, setMaximoEscala] = useState(0.25);
  const [minimoEscala, setMinimoEscala] = useState(0.2);

  const [unidadesEconomicas, setUnidadesEconomicas] = useState(0);
  const [tramitacionTotal, setTramitacionTotal] = useState();
  const [tramitacionSinIncidentes, setTramitacionSinIncidentes] = useState()
  const [honorariosMinimos, setHonorariosMinimos] = useState();
  const [honorariosTramitacionTotal, setHonorariosTramitacionTotal] =
    useState();
  const [jus, setJus] = useState(5968);

  const valorUnidadEconomica = 1573000;

  const aperturaDeCarpeta = jus * 3;

  // setUnidadesEconomicas(unidadesEconomicas);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const honorariosMin = honorariosMini(B2, jus);
    // setHonorariosMinimos(honorariosMin);

    const newBase = baseRegulatoria(B5);
    setBase(newBase);
    const newUnidadesEconomicas = newBase / valorUnidadEconomica;
    setUnidadesEconomicas(newUnidadesEconomicas);

    const newMinimoEscala = calculateMinimoEscala(newUnidadesEconomicas);
    setMinimoEscala(newMinimoEscala);

    const newPuntoMedio = (newMinimoEscala + maximoEscala) / 2;
    setPuntoMedio(newPuntoMedio);

    const newEscalaSinIncidente = (newPuntoMedio * 0.6);
    setEscalaSinIncidente(newEscalaSinIncidente)

    const newTramitacionTotal = newPuntoMedio * newBase + aperturaDeCarpeta;
    setTramitacionTotal(newTramitacionTotal);

    const newTramitacionSinIncidentes = newEscalaSinIncidente * newBase + aperturaDeCarpeta;
    setTramitacionSinIncidentes(newTramitacionSinIncidentes)

    const newFinalResult = newTramitacionTotal
    
    setHonorariosTramitacionTotal(newFinalResult);
    console.log(newFinalResult);

    const finalResult = {
      base: formatCurrency(newBase),
      unidadesEconomicas: newUnidadesEconomicas,
      minimoEscala: (newMinimoEscala * 100).toFixed(2),
      maximoEscala: maximoEscala * 100,
      puntoMedio: (newPuntoMedio * 100).toFixed(2),
      aperturaDeCarpeta: formatCurrency(aperturaDeCarpeta),
      tramitacionTotal: formatCurrency(newTramitacionTotal),
      // honorariosMinimos: formatCurrency(honorariosMin),
      honorariosTramitacionTotal: formatCurrency(newFinalResult),
      escalaSinIncidente: newEscalaSinIncidente,
      tramitacionSinIncidentes: newTramitacionSinIncidentes,
    };

    setResults(finalResult);
    console.log(finalResult);

    // setHonorariosMinimos(honorariosMin);
    setBase(newBase);
    setUnidadesEconomicas(newUnidadesEconomicas);
    setMinimoEscala(newMinimoEscala);
    setPuntoMedio(newPuntoMedio);
    setTramitacionTotal(newTramitacionTotal);
    setHonorariosTramitacionTotal(newFinalResult);
    setEscalaSinIncidente(newEscalaSinIncidente);
    setTramitacionSinIncidentes(newTramitacionSinIncidentes)
  };

  const handleReset = () => {
    // setB2("ORDINARIO");
    // setB3("ACTOR");
    // setB4("ADMISIÓN TOTAL");
    setB5(0);
    setBase(0);
    setPuntoMedio(0);
    setMaximoEscala(0.25);
    setMinimoEscala(0.2);
    setUnidadesEconomicas(0);
    setTramitacionTotal(0);
    setHonorariosTramitacionTotal(0);
    setJus(5968);
    setEscalaSinIncidente(0);
    setTramitacionSinIncidentes(0)
    setStages({
        EscritoDH: false,
        AutoDH: false,
        AperturaSucesorio: false,
        Particion: false,
        Inventario: false,
    });
  };
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Resultados", 10, 10);
    doc.setFontSize(16);

    doc.text(`Base: ${formatCurrency(base)}`, 10, 20);
    doc.text(`Unidades económicas: ${unidadesEconomicas}`, 10, 30);
    doc.text(`Minimo Escala: ${minimoEscala}`, 10, 40);
    doc.text(`Máximo Escala: ${maximoEscala}`, 10, 50);
    doc.text(
      `Apertura de Carpeta: ${formatCurrency(aperturaDeCarpeta)}`,
      10,
      60
    );
    doc.text(`Punto Medio: ${puntoMedio}`, 10, 70);
    doc.text(
      `Honorarios Tramitación Total: ${formatCurrency(
        honorariosTramitacionTotal
      )}`,
      10,
      80
    );

    // Add other results here
    doc.save("resultados.pdf");
  };

  // const minimoEscala = calculateMinimoEscala(unidadesEconomicas);
  // setMinimoEscala(minimoEscala);

  // const puntoMedio = (minimoEscala + maximoEscala) / 2;
  // setPuntoMedio(puntoMedio);

  return (
    <form onSubmit={handleSubmit}>
      <VStack  paddingTop={['15%', '15%', '15%', '8%']} paddingBottom="10%">
      <Stack alignItems='center'direction={['column', 'column','column', 'row']} width='80%' spacing='10%' justifyContent='space-around'>
          <VStack fontSize=''>
            <FormControl>
              <FormLabel>Valor Jus(modificar de ser necesario)</FormLabel>
              <Input
                type="number"
                value={jus}
                onChange={(e) => setJus(e.target.value)}
              />
            </FormControl>
            {/* <FormControl>
              <FormLabel>TIPO DE JUICIO</FormLabel>
              <Select value={B2} onChange={(e) => setB2(e.target.value)}>
                {optionsB2.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>VENCEDOR</FormLabel>
              <Select value={B3} onChange={(e) => setB3(e.target.value)}>
                {optionsB3.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>RESULTADO</FormLabel>
              <Select value={B4} onChange={(e) => setB4(e.target.value)}>
                {optionsB4.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl> */}
            <FormControl>
              <FormLabel>BASE IMPONIBLE </FormLabel>
              <Input
                type="number"
                value={B5}
                onChange={(e) => setB5(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Otro porcentaje</FormLabel>
              {/* <Input
    type="number"
    value={puntoMedio*100}
    onChange={(e) => setPuntoMedio(e.target.value/100)}   
  
  /> */}
            </FormControl>

            <ButtonGroup>
              <Button type="submit" colorScheme="blue">
                Calcular
              </Button>
              <Button colorScheme="red" onClick={handleReset}>
                Resetear
              </Button>
              <Button colorScheme="green" onClick={downloadPdf}>
                Descargar PDF
              </Button>
            </ButtonGroup>
          </VStack>

          <VStack spacing={4} alignItems="center" width="100%">
            <Box
              bg="blue.100"
              borderRadius="md"
              p={4}
              boxShadow="md"
              width={[ '60%', '60%', '60%']} // set a fixed width for larger screens and 80% for small screens
              height="auto" // set a fixed height
              minWidth="400px" // set a minimum width
              minHeight="350px" // set a minimum height
              textAlign="left"
            >
              <Text fontWeight="bold" fontSize="2xl" mb={2}>
                Resultados
              </Text>
              <Text>
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Base:
                </Text>{" "}
                {formatCurrency(base)}
              </Text>
              <Text>
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Unidades económicas:
                </Text>{" "}
                {unidadesEconomicas.toFixed(2)}
              </Text>
              <Text>
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Mínimo escala:
                </Text>{" "}
                {(minimoEscala * 100).toFixed(2)} %
              </Text>
              <Text>
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Máximo escala:
                </Text>{" "}
                {maximoEscala * 100} %
              </Text>
              <Text>
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Punto medio:
                </Text>{" "}
                {(puntoMedio * 100).toFixed(2)} %
              </Text>
              <Text>
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Apertura de carpeta:
                </Text>{" "}
                {formatCurrency(aperturaDeCarpeta)}
              </Text>
              <Text>
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Tramitación total sin Incidentes
                </Text>{" "}
                {formatCurrency(tramitacionSinIncidentes)}
              </Text>
              <Text>
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Tramitación total con Incidentes
                </Text>{" "}
                {formatCurrency(tramitacionTotal)}
              </Text>
              
              {/* <Text>
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Honorarios Minimos:
                </Text>{" "}
                {formatCurrency(honorariosMinimos)}
              </Text> */}
              <Text fontWeight="bold" fontSize="2xl" align="center">
                <Text as="span" fontWeight="bold" fontSize="2xl">
                  Honorarios Tramitación Total :
                </Text>{" "}
                {formatCurrency(honorariosTramitacionTotal)}
              </Text>
            </Box>
          </VStack>
          <VStack>
            <Text width="100%" as="span" fontWeight="bold" fontSize="xl">
              Honorarios por etapas
            </Text>

            <VStack width="100%" align="left">
              <Checkbox
                isChecked={stages.DemandaYContestacion}
                onChange={() => handleStageChange("EscritoDH")}
              >
               Escrito Inicial
              </Checkbox>
              <Checkbox
                isChecked={stages.OfrecimientoDePrueba}
                onChange={() => handleStageChange("AutoDH")}
              >
                Tramitacion hasta Auto DH
              </Checkbox>
              <Checkbox
                isChecked={stages.DiligenciamientoDePrueba}
                onChange={() => handleStageChange("AperturaSucesorio")}
              >
                Apertura Sucesorio
              </Checkbox>
              <Checkbox
                isChecked={stages.Alegatos}
                onChange={() => handleStageChange("Particion")}
              >
                Particion de Bienes
              </Checkbox>
              <Checkbox
                isChecked={stages.Alegatos}
                onChange={() => handleStageChange("Inventario")}
              >
                Inventario
              </Checkbox>
              {/* <Text>
  <Text as="span" fontWeight="bold" fontSize="xl">
    Porcentaje de etapas seleccionadas:
  </Text>{" "}
  {(totalStagesPercentage * 100).toFixed(2)} %
</Text> */}
              <Text as="span" fontWeight="bold" fontSize="xl">
                Monto por etapas seleccionadas:
              </Text>{" "}
              <Text align="center" fontWeight="bold" fontSize="2xl">
                {formatCurrency(
                  honorariosTramitacionTotal * totalStagesPercentage + inventarioHonorario
                )}
              </Text>
            </VStack>
          </VStack>
          {/* <VStack spacing={4} alignItems="start" width='50%'>
    <Box
      bg="blue.100"
      borderRadius="md"
      p={4}
      boxShadow="md"
      width="50%"
      textAlign="left"
    >
      
     </Box>
</VStack>   */}
        </Stack>
      </VStack>
    </form>
  );
}

export default CalculadoraSucesorio;
