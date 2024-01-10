import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Stack,
  ButtonGroup,
  Checkbox,
  InputRightAddon,
  InputGroup,
  InputLeftAddon,

} from "@chakra-ui/react";

import { useCalculatorResults } from "../contextApi/CalculatorResultsContext";
import { jsPDF } from "jspdf";
import { useJus } from "./useJus";
import { useUnidadEconomica } from "./useUnidadEconomica";


function baseRegulatoria(B5) {
  return B5;
}

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
  const jus = useJus();
  const valorUnidadEconomica = useUnidadEconomica();
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
  const [puntoMedio, setPuntoMedio] = useState(0);
  const[escalaSinIncidente, setEscalaSinIncidente] = useState()
  const [maximoEscala, setMaximoEscala] = useState(0.25);
  const [minimoEscala, setMinimoEscala] = useState(0.2);
  const [isAperturaChecked, setIsAperturaChecked] = useState(false);
  const [customPercentage, setCustomPercentage] = useState(null);
  const [formattedB5, setFormattedB5] = useState(0);
  const [caratulaExpediente, setCaratulaExpediente] = useState('');

  const [unidadesEconomicas, setUnidadesEconomicas] = useState(0);
  const [tramitacionTotal, setTramitacionTotal] = useState(0);
  const [tramitacionSinIncidentes, setTramitacionSinIncidentes] = useState(0)
  const [honorariosMinimos, setHonorariosMinimos] = useState();
  const [honorariosTramitacionTotal, setHonorariosTramitacionTotal] =
    useState(0);
  // const [jus, setJus] = useState(5968);

  // const valorUnidadEconomica = 1573000;

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
    console.log(newPuntoMedio);

    const newEscalaSinIncidente = (newPuntoMedio * 0.6);
    setEscalaSinIncidente(newEscalaSinIncidente)
    console.log(newEscalaSinIncidente)

    console.log('customPercentage', customPercentage);
console.log('puntoMedio', puntoMedio);
console.log('customPercentage', customPercentage);
console.log('puntoMedio', puntoMedio);

    const percentageToUse = customPercentage !== null ? customPercentage : newPuntoMedio;
    const percentageForSinIncidentes = customPercentage !== null ? customPercentage : newEscalaSinIncidente;
    console.log('percentageToUse', percentageToUse);
    console.log('newBase', newBase);
    const newTramitacionTotal = percentageToUse * newBase + (isAperturaChecked ? aperturaDeCarpeta : 0);
setTramitacionTotal(newTramitacionTotal);
console.log(newTramitacionTotal);

const newTramitacionSinIncidentes = percentageForSinIncidentes * newBase + (isAperturaChecked ? aperturaDeCarpeta : 0);
setTramitacionSinIncidentes(newTramitacionSinIncidentes)
console.log(newTramitacionSinIncidentes)

const newFinalResult = newTramitacionTotal;
    
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
    doc.text("Caratula Expediente: " + caratulaExpediente, 10, 10); // Add this line
    doc.text("Resultados", 10, 20); // Change the y-coordinate to 20
    doc.setFontSize(16);

    doc.text(`Base: ${formatCurrency(base)}`, 10, 30); // Change the y-coordinate to 30
    doc.text(`Unidades económicas: ${unidadesEconomicas}`, 10, 40); // Change the y-coordinate to 40
    doc.text(`Jus value: ${jusValue}`, 10, 50); // Add this line
    doc.text(`Unidad Economica: ${unidadEconomica}`, 10, 60); // Add this line
    doc.text(`Minimo Escala: ${minimoEscala}`, 10, 70); // Change the y-coordinate to 70
    doc.text(`Máximo Escala: ${maximoEscala}`, 10, 80); // Change the y-coordinate to 80
    doc.text(
      `Apertura de Carpeta: ${formatCurrency(aperturaDeCarpeta)}`,
      10,
      90 // Change the y-coordinate to 90
    );
    doc.text(`Punto Medio: ${puntoMedio}`, 10, 100); // Change the y-coordinate to 100
    doc.text(
      `Honorarios Tramitación Total: ${formatCurrency(
        honorariosTramitacionTotal
      )}`,
      10,
      110 // Change the y-coordinate to 110
    );

    // Add other results here
    doc.save("resultados.pdf");
  };

  // const minimoEscala = calculateMinimoEscala(unidadesEconomicas);
  // setMinimoEscala(minimoEscala);

  // const puntoMedio = (minimoEscala + maximoEscala) / 2;
  // setPuntoMedio(puntoMedio);

  const formatInput = (input) => {
    // Remove non-digit characters and convert to a number
    const rawValue = parseInt(input.replace(/\D/g, ''), 10);
    
    // Format the number with thousands separators
    const formattedValue = new Intl.NumberFormat().format(rawValue);
    
    return formattedValue;
  };

  return (
    <form onSubmit={handleSubmit}>
     <VStack paddingTop={['15%', '10%', '8%', '5%']} paddingBottom="10%" alignItems = "center">
  <Stack
    alignItems='center'
    direction={['column', 'column', 'row', 'row']}
    spacing={['5%', '10%', '15%', '20%']} // Increase spacing
    justifyContent='space-around'
    width={['100%', '100%', '100%', '100%']} // Set width to 100% for all screen sizes
  >
    <VStack> // Increase spacing
    <FormControl>
  <FormLabel>Caratula Expediente</FormLabel>
  <Input
    type="text"
    value={caratulaExpediente}
    onChange={(e) => setCaratulaExpediente(e.target.value)}
  />
</FormControl>
      <FormControl>
        <FormLabel>Valor Jus</FormLabel>
        <Input
          type="number"
          value={jus}
          onChange={(e) => setJus(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>BASE IMPONIBLE</FormLabel>
        <InputGroup>
          <InputLeftAddon children="$" />
          <Input
            type="text"
            value={formattedB5} // Use the formatted value for display
            onChange={(e) => {
              // Remove non-digit characters and convert to a number
              const rawValue = parseInt(e.target.value.replace(/\D/g, ''), 10);
              
              // Set the raw value for calculations
              setB5(rawValue);
              console.log(rawValue);
              
              // Format the input and set the formatted value
              const formattedValue = isNaN(rawValue) ? '' : formatInput(String(rawValue));
              setFormattedB5(formattedValue);
            }}
          />
        </InputGroup>
      </FormControl>
            <FormControl>
  <FormLabel>Apertura de Carpeta?</FormLabel>
  <Checkbox
    isChecked={isAperturaChecked}
    onChange={(e) => setIsAperturaChecked(e.target.checked)}
  >
    Incluir Apertura de Carpeta en el resultado final
  </Checkbox>
  <FormControl>
    <FormLabel>Otro porcentaje</FormLabel>
    <InputGroup>
      <Input
        type="number"
        placeholder="0" // Add placeholder
        value={customPercentage !== null ? customPercentage * 100 : ''} // Convert to percentage
        onChange={(e) => setCustomPercentage(e.target.value / 100)} // Convert from percentage
      />
      <InputRightAddon children="%" /> // Add percentage sign
    </InputGroup>
  </FormControl>
</FormControl>

            <ButtonGroup spacing="4">
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
              <Text color="green.500">
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Porcentaje aplicado:
                </Text>{" "}
                <Text as="span" fontWeight="bold" fontSize="2xl">
                  {(customPercentage !== undefined && customPercentage !== '' && customPercentage !== 0 ? customPercentage : puntoMedio) * 100} %
                </Text>
              </Text>
            </Box>
          </VStack>
          <VStack width="100%" minWidth={['100%', '80%', '60%', '400px']} alignItems="justify">
            <Text align='center' width="100%" minWidth='300px'as="span" fontWeight="bold" fontSize="xl">
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
