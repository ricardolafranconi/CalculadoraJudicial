import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  HStack,
  ButtonGroup
} from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { setResults } from '../actions/calculatorActions';

const optionsB2 = ["ORDINARIO", "ABREVIADO", "EJECUTIVO"];
const optionsB3 = ["ACTOR", "DEMANDADO"];
const optionsB4 = ["ADMISIÓN TOTAL", "ADMISIÓN PARCIAL", "RECHAZO TOTAL"];


const jus = 5968





function baseRegulatoria(B2, B3, B4, B5) {
    if (B2 === "ORDINARIO" && B3 === "ACTOR" && B4 === "ADMISIÓN TOTAL") {
        return B5 * 1;
      } else if (B2 === "ORDINARIO" && B3 === "ACTOR" && B4 === "ADMISIÓN PARCIAL") {
        return B5 * 1;
      } else if (B2 === "ORDINARIO" && B3 === "ACTOR" && B4 === "RECHAZO TOTAL") {
        return B5 * 0.2;
      } else if (B2 === "ORDINARIO" && B3 === "DEMANDADO" && B4 === "ADMISIÓN TOTAL") {
        return B5 * 1;
      } else if (B2 === "ORDINARIO" && B3 === "DEMANDADO" && B4 === "ADMISIÓN PARCIAL") {
        return B5 * 1;
      } else if (B2 === "ORDINARIO" && B3 === "DEMANDADO" && B4 === "RECHAZO TOTAL") {
        return B5 * 1;
      } else if (B2 === "ABREVIADO" && B3 === "ACTOR" && B4 === "ADMISIÓN TOTAL") {
        return B5 * 1;
      } else if (B2 === "ABREVIADO" && B3 === "ACTOR" && B4 === "ADMISIÓN PARCIAL") {
        return B5 * 1;
      } else if (B2 === "ABREVIADO" && B3 === "ACTOR" && B4 === "RECHAZO TOTAL") {
        return B5 * 0.2;
      } else if (B2 === "ABREVIADO" && B3 === "DEMANDADO" && B4 === "ADMISIÓN TOTAL") {
        return B5 * 0.2;
      } else if (B2 === "ABREVIADO" && B3 === "DEMANDADO" && B4 === "ADMISIÓN PARCIAL") {
        return B5 * 0.3;
      } else if (B2 === "ABREVIADO" && B3 === "DEMANDADO" && B4 === "RECHAZO TOTAL") {
        return B5 * 0.1;
      } else if (B2 === "EJECUTIVO" && B3 === "ACTOR" && B4 === "ADMISIÓN TOTAL") {
        return B5 * 0.1;
      } else if (B2 === "EJECUTIVO" && B3 === "ACTOR" && B4 === "ADMISIÓN PARCIAL") {
        return B5 * 0.1;
      } else if (B2 === "EJECUTIVO" && B3 === "ACTOR" && B4 === "RECHAZO TOTAL") {
        return B5 * 0.2;
      } else if (B2 === "EJECUTIVO" && B3 === "DEMANDADO" && B4 === "ADMISIÓN TOTAL") {
        return B5 * 0.2;
      } else if (B2 === "EJECUTIVO" && B3 === "DEMANDADO" && B4 === "ADMISIÓN PARCIAL") {
        return B5 * 0.3;
      } else if (B2 === "EJECUTIVO" && B3 === "DEMANDADO" && B4 === "RECHAZO TOTAL") {
        return B5 * 0.1;
      }
      return 0;
    }
    
    function honorariosMini (B2) {
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
    };

   

    function calculateMinimoEscala(unidadesEconomicas) {
      if (unidadesEconomicas < 5) return 0.2;
      if (unidadesEconomicas < 15) return 0.18;
      if (unidadesEconomicas < 30) return 0.16;
      if (unidadesEconomicas < 50) return 0.14;
      if (unidadesEconomicas < 100) return 0.12;
      return 0.1;
    }

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    };
  

  

 function Calculator() {
  const dispatch = useDispatch();
  const [B2, setB2] = useState("ORDINARIO");
  const [B3, setB3] = useState("ACTOR");
  const [B4, setB4] = useState("ADMISIÓN TOTAL");
  const [B5, setB5] = useState(0);
  const [base, setBase] = useState(0);
  const[puntoMedio, setPuntoMedio] = useState()
const[maximoEscala, setMaximoEscala] = useState(0.25)
const[minimoEscala, setMinimoEscala] = useState(0.2)

const[unidadesEconomicas, setUnidadesEconomicas] = useState()
const[tramitacionTotal, setTramitacionTotal] = useState()
const[honorariosMinimos, setHonorariosMinimos] = useState()
const[honorariosTramitacionTotal, setHonorariosTramitacionTotal] = useState()


const valorUnidadEconomica = 1573000

const aperturaDeCarpeta = jus * 3


  // setUnidadesEconomicas(unidadesEconomicas);


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const honorariosMin = honorariosMini(B2);
    setHonorariosMinimos(honorariosMin);
    
  const newBase = baseRegulatoria(B2, B3, B4, B5);
  setBase(newBase);
  const newUnidadesEconomicas = newBase / valorUnidadEconomica;
  setUnidadesEconomicas(newUnidadesEconomicas);
 

  const newMinimoEscala = calculateMinimoEscala(newUnidadesEconomicas);
  setMinimoEscala(newMinimoEscala);

  const newPuntoMedio = (newMinimoEscala + maximoEscala) / 2;
  setPuntoMedio(newPuntoMedio)

  const newTramitacionTotal = (newPuntoMedio * newBase) + aperturaDeCarpeta;
  setTramitacionTotal(newTramitacionTotal)
  
  const newFinalResult = honorariosMin > newTramitacionTotal ? honorariosMin : newTramitacionTotal;
  setHonorariosTramitacionTotal(newFinalResult);
  console.log(newFinalResult)
 


  };

  const finalResult = {
    base: formatCurrency(base),
    unidadesEconomicas,
    minimoEscala: (minimoEscala * 100).toFixed(2),
    maximoEscala: maximoEscala * 100,
    puntoMedio: (puntoMedio * 100).toFixed(2),
    aperturaDeCarpeta: formatCurrency(aperturaDeCarpeta),
    tramitacionTotal: formatCurrency(tramitacionTotal),
    honorariosMinimos: formatCurrency(honorariosMinimos),
    honorariosTramitacionTotal: formatCurrency(honorariosTramitacionTotal),
  };

  dispatch(setResults(finalResult));

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
  };



  // const minimoEscala = calculateMinimoEscala(unidadesEconomicas);
  // setMinimoEscala(minimoEscala);

  // const puntoMedio = (minimoEscala + maximoEscala) / 2;
  // setPuntoMedio(puntoMedio);
 
  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={2}>
        <FormControl>
          <FormLabel>TIPO DE JUICIO</FormLabel>
          <Select
            value={B2}
            onChange={(e) => setB2(e.target.value)}
          >
            {optionsB2.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>VENCEDOR</FormLabel>
          <Select
            value={B3}
            onChange={(e) => setB3(e.target.value)}
          >
            {optionsB3.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>RESULTADO</FormLabel>
          <Select
            value={B4}
            onChange={(e) => setB4(e.target.value)}
          >
            {optionsB4.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>MONTO SENTENCIA</FormLabel>
          <Input
            type="number"
            value={B5}
            onChange={(e) => setB5(e.target.value)}
          />
        </FormControl>
        <ButtonGroup>
        <Button type="submit" colorScheme="blue">
          Calcular
        </Button>
        <Button colorScheme="red" onClick={handleReset}>
          Reset
        </Button>
      </ButtonGroup>
  

        <VStack spacing={4} alignItems="start"  width='100%'>
    <Box
      bg="blue.100"
      borderRadius="md"
      p={4}
      boxShadow="md"
      width={{ base: "80%", sm: "500px" }} // set a fixed width for larger screens and 80% for small screens
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
        {unidadesEconomicas}
      </Text>
      <Text>
        <Text as="span" fontWeight="bold"fontSize="xl">
          Mínimo escala:
        </Text>{" "}
        {(minimoEscala *100).toFixed(2)} %
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
        {(puntoMedio *100).toFixed(2)} %
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
      <Text fontWeight="bold" fontSize="2xl" align='center'>
  <Text as="span" fontWeight="bold" fontSize="2xl" >
    Honorarios Tramitación Total :
  </Text>{" "}
  {formatCurrency(honorariosTramitacionTotal)}
</Text>
    </Box>
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



      </VStack>
    </form>
  );
}


export default Calculator;


