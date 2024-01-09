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
  InputGroup, 
  InputRightAddon,
  FormHelperText,
  InputLeftAddon,
} from "@chakra-ui/react";

import {
  CalculatorResultsContext,
  useCalculatorResults,
} from "../contextApi/CalculatorResultsContext";
import { jsPDF } from "jspdf";
import axios from 'axios';
import parse from 'html-react-parser'


const optionsB2 = ["ORDINARIO", "ABREVIADO", "EJECUTIVO"];
const optionsB3 = ["ACTOR", "DEMANDADO"];
const optionsB4 = ["ADMISIÓN TOTAL", "ADMISIÓN PARCIAL", "RECHAZO TOTAL"];


function baseRegulatoria(B2, B3, B4, B5) {
  if (B2 === "ORDINARIO" && B3 === "ACTOR" && B4 === "ADMISIÓN TOTAL") {
    return B5 * 1;
  } else if (
    B2 === "ORDINARIO" &&
    B3 === "ACTOR" &&
    B4 === "ADMISIÓN PARCIAL"
  ) {
    return B5 * 1;
  } else if (B2 === "ORDINARIO" && B3 === "ACTOR" && B4 === "RECHAZO TOTAL") {
    return B5 * 0.2;
  } else if (
    B2 === "ORDINARIO" &&
    B3 === "DEMANDADO" &&
    B4 === "ADMISIÓN TOTAL"
  ) {
    return B5 * 1;
  } else if (
    B2 === "ORDINARIO" &&
    B3 === "DEMANDADO" &&
    B4 === "ADMISIÓN PARCIAL"
  ) {
    return B5 * 1;
  } else if (
    B2 === "ORDINARIO" &&
    B3 === "DEMANDADO" &&
    B4 === "RECHAZO TOTAL"
  ) {
    return B5 * 1;
  } else if (B2 === "ABREVIADO" && B3 === "ACTOR" && B4 === "ADMISIÓN TOTAL") {
    return B5 * 1;
  } else if (
    B2 === "ABREVIADO" &&
    B3 === "ACTOR" &&
    B4 === "ADMISIÓN PARCIAL"
  ) {
    return B5 * 1;
  } else if (B2 === "ABREVIADO" && B3 === "ACTOR" && B4 === "RECHAZO TOTAL") {
    return B5 * 0.2;
  } else if (
    B2 === "ABREVIADO" &&
    B3 === "DEMANDADO" &&
    B4 === "ADMISIÓN TOTAL"
  ) {
    return B5 * 0.2;
  } else if (
    B2 === "ABREVIADO" &&
    B3 === "DEMANDADO" &&
    B4 === "ADMISIÓN PARCIAL"
  ) {
    return B5 * 0.3;
  } else if (
    B2 === "ABREVIADO" &&
    B3 === "DEMANDADO" &&
    B4 === "RECHAZO TOTAL"
  ) {
    return B5 * 0.1;
  } else if (B2 === "EJECUTIVO" && B3 === "ACTOR" && B4 === "ADMISIÓN TOTAL") {
    return B5 * 0.1;
  } else if (
    B2 === "EJECUTIVO" &&
    B3 === "ACTOR" &&
    B4 === "ADMISIÓN PARCIAL"
  ) {
    return B5 * 0.1;
  } else if (B2 === "EJECUTIVO" && B3 === "ACTOR" && B4 === "RECHAZO TOTAL") {
    return B5 * 0.2;
  } else if (
    B2 === "EJECUTIVO" &&
    B3 === "DEMANDADO" &&
    B4 === "ADMISIÓN TOTAL"
  ) {
    return B5 * 0.2;
  } else if (
    B2 === "EJECUTIVO" &&
    B3 === "DEMANDADO" &&
    B4 === "ADMISIÓN PARCIAL"
  ) {
    return B5 * 0.3;
  } else if (
    B2 === "EJECUTIVO" &&
    B3 === "DEMANDADO" &&
    B4 === "RECHAZO TOTAL"
  ) {
    return B5 * 0.1;
  }
  return 0;
}

function honorariosMini(B2, jus) {
  const ORDINARIO = jus * 20;
  const ABREVIADO = jus * 15;
  const EJECUTIVO = jus * 10;

  return B2 === "ORDINARIO"
    ? ORDINARIO
    : B2 === "ABREVIADO"
    ? ABREVIADO
    : B2 === "EJECUTIVO"
    ? EJECUTIVO
    : 0;
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

function Calculator() {
  const [stages, setStages] = useState({
    DemandaYContestacion: false,
    OfrecimientoDePrueba: false,
    DiligenciamientoDePrueba: false,
    Alegatos: false,
  });

  const [totalStagesPercentage, setTotalStagesPercentage] = useState(0);

  useEffect(() => {
    let newPercentage = 0;
    if (stages.DemandaYContestacion) newPercentage += 40;
    if (stages.OfrecimientoDePrueba) newPercentage += 20;
    if (stages.DiligenciamientoDePrueba) newPercentage += 20;
    if (stages.Alegatos) newPercentage += 20;
    setTotalStagesPercentage(newPercentage / 100);
  }, [stages]);

  const handleStageChange = (stage) => {
    setStages((prevStages) => ({
      ...prevStages,
      [stage]: !prevStages[stage],
    }));
  };

  const { setResults } = useCalculatorResults();
  const [B2, setB2] = useState("ORDINARIO");
  const [B3, setB3] = useState("ACTOR");
  const [B4, setB4] = useState("ADMISIÓN TOTAL");
  const [B5, setB5] = useState(0);
  const [formattedB5, setFormattedB5] = useState('');
  const [base, setBase] = useState(0);
  const [puntoMedio, setPuntoMedio] = useState(0);
  const [maximoEscala, setMaximoEscala] = useState(0.25);
  const [minimoEscala, setMinimoEscala] = useState(0.2);

  const [unidadesEconomicas, setUnidadesEconomicas] = useState(0);
  const [tramitacionTotal, setTramitacionTotal] = useState(0);
  const [honorariosMinimos, setHonorariosMinimos] = useState(0);
  const [honorariosTramitacionTotal, setHonorariosTramitacionTotal] =
    useState(0);
  const [jus, setJus] = useState(null);
  const [customPercentage, setCustomPercentage] = useState(0);
  const [caratulaExpediente, setCaratulaExpediente] = useState('');
  const [jusDisplay, setJusDisplay] = useState('');

  const valorUnidadEconomica = 1573000;

  const aperturaDeCarpeta = (jus / 100) * 3;
  const formattedAperturaDeCarpeta = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aperturaDeCarpeta);


  // setUnidadesEconomicas(unidadesEconomicas);

  useEffect(() => {
    fetch('/api/jus')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.jus) {
          const jusNumber = Number(data.jus.replace(/\$|,|\./g, '').replace(',', '.'));
          if (isNaN(jusNumber)) {
            console.log('Jus value is not a valid number:', data.jus);
          } else {
            setJus(jusNumber);  // Convert to cents
            setJusDisplay(data.jus.replace('$', ''));  // Remove dollar sign
          }
        } else {
          console.log('Jus value is null or undefined:', data.jus);
        }
      })
      .catch(error => console.error('Error fetching jus value:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const honorariosMin = honorariosMini(B2, jus);
    setHonorariosMinimos(honorariosMin);

    const newBase = baseRegulatoria(B2, B3, B4, B5);
    setBase(newBase);
    const newUnidadesEconomicas = newBase / valorUnidadEconomica;
    setUnidadesEconomicas(newUnidadesEconomicas);

    const newMinimoEscala = calculateMinimoEscala(newUnidadesEconomicas);
    setMinimoEscala(newMinimoEscala);

    const newPuntoMedio = (newMinimoEscala + maximoEscala) / 2;
    setPuntoMedio(newPuntoMedio);

    // Use the custom percentage if it's greater than 0, otherwise use the puntoMedio
  const percentageToUse = customPercentage > 0 ? customPercentage : newPuntoMedio;
  const newTramitacionTotal = percentageToUse * newBase + aperturaDeCarpeta;
  setTramitacionTotal(newTramitacionTotal);



    const newFinalResult =
      honorariosMin > newTramitacionTotal ? honorariosMin : newTramitacionTotal;
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
      honorariosMinimos: formatCurrency(honorariosMin),
      honorariosTramitacionTotal: formatCurrency(newFinalResult),
    };

    setResults(finalResult);
    console.log(finalResult);

    setHonorariosMinimos(honorariosMin);
    setBase(newBase);
    setUnidadesEconomicas(newUnidadesEconomicas);
    setMinimoEscala(newMinimoEscala);
    setPuntoMedio(newPuntoMedio);
    setTramitacionTotal(newTramitacionTotal);
    setHonorariosTramitacionTotal(newFinalResult);
  };

  const handleReset = () => {
    setB2("ORDINARIO");
    setB3("ACTOR");
    setB4("ADMISIÓN TOTAL");
    setB5(0);
    setBase(0);
    setPuntoMedio(0);
    setMaximoEscala(0.25);
    setMinimoEscala(0.2);
    setUnidadesEconomicas(0);
    setTramitacionTotal(0);
    setHonorariosTramitacionTotal(0);
    setJus(5968);
    setCustomPercentage(''); // reset customPercentage
    setCaratulaExpediente('');

    setStages({
      DemandaYContestacion: false,
      OfrecimientoDePrueba: false,
      DiligenciamientoDePrueba: false,
      Alegatos: false,
    });
  };
  const downloadPdf = () => {
    const doc = new jsPDF();

    // Set the font size and add "Caratula expediente" at the top
    doc.setFontSize(26);
    doc.text("Honorarios Expediente: " + caratulaExpediente, 10, 20);

    // Set the font size for the rest of the text
    doc.setFontSize(16);

    // Add a line break after each text to create some space between them
    let y = 30;
    const lineBreak = 10;

    doc.text(`Base: ${formatCurrency(base)}`, 10, y);
    y += lineBreak;

    doc.text(`Unidades económicas: ${unidadesEconomicas}`, 10, y);
    y += lineBreak;

    doc.text(`Minimo Escala: ${minimoEscala}`, 10, y);
    y += lineBreak;

    doc.text(`Máximo Escala: ${maximoEscala}`, 10, y);
    y += lineBreak;

    doc.text(`Apertura de Carpeta: ${formatCurrency(aperturaDeCarpeta)}`, 10, y);
    y += lineBreak;

    doc.text(`Punto Medio: ${puntoMedio}`, 10, y);
    y += lineBreak;

    doc.text(`Honorarios Tramitación Total: ${formatCurrency(honorariosTramitacionTotal)}`, 10, y);
    y += lineBreak;

    // Add "customPercentage" at the bottom
    doc.setFontSize(18);
    doc.text(`Porcentaje aplicado: ${(customPercentage !== '' ? customPercentage : puntoMedio) * 100} %`, 10, y + lineBreak);

    // Save the PDF
    doc.save(`Resultados_${caratulaExpediente}.pdf`);;
  };

  useEffect(() => {
    // This function adds commas as thousands separators
    const formatNumber = (num) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    setFormattedB5(formatNumber(B5));
  }, [B5]);

  // const minimoEscala = calculateMinimoEscala(unidadesEconomicas);
  // setMinimoEscala(minimoEscala);

  // const puntoMedio = (minimoEscala + maximoEscala) / 2;
  // setPuntoMedio(puntoMedio);

  return (
    <form onSubmit={handleSubmit}>
      <VStack  paddingTop={['15%', '10%', '5%', '2%']} paddingBottom="10%">
      <Stack alignItems='center'
        direction={['column', 'column', 'row', 'row']}
        width='100%'
        spacing={['5%', '10%', '15%', '20%']}
        justifyContent='space-around'>
           <VStack fontSize={['sm', 'md', 'lg', 'xl']}>
           <FormControl>
  <FormLabel>Caratula Expediente</FormLabel>
  <Input
    type="text"
    value={caratulaExpediente}
    onChange={(e) => setCaratulaExpediente(e.target.value)}
  />
</FormControl>
            <FormControl>
              <FormLabel>Valor Jus(modificar de ser necesario)</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                <Input
                  type="text"
                  value={jusDisplay}
                  onChange={(e) => {
                    const jusNumber = Number(e.target.value.replace(/\$|,|\./g, '').replace(',', '.'));
                    if (!isNaN(jusNumber)) {
                      setJus(jusNumber * 100);  // Convert to cents
                      setJusDisplay(e.target.value);
                    }
                  }}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
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
            </FormControl>
            <FormControl>
              <FormLabel>MONTO SENTENCIA</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                <Input
                  type="text"
                  value={formattedB5}
                  onChange={(e) => {
                    // Remove non-digit characters and convert to a number
                    const rawValue = Number(e.target.value.replace(/,/g, ''));
                    setB5(rawValue);
                  }}
                />
              </InputGroup>
            </FormControl>
   
    <FormControl>
      <FormLabel>Otro porcentaje</FormLabel>
      <InputGroup>
        <Input
          type="number"
          placeholder="Si está vacío, se usará el valor de Punto Medio"
          value={customPercentage !== '' ? parseFloat((customPercentage * 100).toFixed(2)) : ''}
          onChange={(e) => {
            if (e.target.value === '') {
              setCustomPercentage('');
            } else {
              setCustomPercentage(Number(e.target.value) / 100);
            }
          }}
        />
        <InputRightAddon children="%" />
      </InputGroup>
      <FormHelperText>Si no se especifica un porcentaje, se usará el valor de Punto Medio por defecto.</FormHelperText>
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
               width={['90%', '80%', '70%', '60%']}
               height="auto"
               minWidth={['90%', '80%', '60%', '400px']}
               minHeight="350px"
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
                  Tramitación total:
                </Text>{" "}
                {formatCurrency(tramitacionTotal)}
              </Text>
              <Text>
                <Text as="span" fontWeight="bold" fontSize="xl">
                  Honorarios Minimos:
                </Text>{" "}
                {formatCurrency(honorariosMinimos)}
              </Text>
              

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
                  {(customPercentage !== '' ? customPercentage : puntoMedio) * 100} %
                </Text>
              </Text>
            </Box>
          </VStack>
          <VStack width="100%" minWidth={['100%', '80%', '60%', '400px']} alignItems="justify">
            <Text align='center' width="100%" minWidth='300px'as="span" fontWeight="bold" fontSize="xl">
              Honorarios por etapas
            </Text>

            <VStack width="100%" minWidth={['100%', '80%', '60%', '400px']} alignItems="justify">
              <Checkbox
                isChecked={stages.DemandaYContestacion}
                onChange={() => handleStageChange("DemandaYContestacion")}
              >
                Demanda y contestación - 40%
              </Checkbox>
              <Checkbox
                isChecked={stages.OfrecimientoDePrueba}
                onChange={() => handleStageChange("OfrecimientoDePrueba")}
              >
                Ofrecimiento de prueba - 20%
              </Checkbox>
              <Checkbox
                isChecked={stages.DiligenciamientoDePrueba}
                onChange={() => handleStageChange("DiligenciamientoDePrueba")}
              >
                Diligenciamiento de prueba - 20%
              </Checkbox>
              <Checkbox
                isChecked={stages.Alegatos}
                onChange={() => handleStageChange("Alegatos")}
              >
                Alegatos - 20%
              </Checkbox>
              {/* <Text>
  <Text as="span" fontWeight="bold" fontSize="xl">
    Porcentaje de etapas seleccionadas:
  </Text>{" "}
  {(totalStagesPercentage * 100).toFixed(2)} %
</Text> */}
              <Text width='100%'as="span" fontWeight="bold" fontSize="l">
                Monto por etapas seleccionadas:
              </Text>{" "}
              <Text align="center" fontWeight="bold" fontSize="2xl">
                {formatCurrency(
                  honorariosTramitacionTotal * totalStagesPercentage
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

export default Calculator;
