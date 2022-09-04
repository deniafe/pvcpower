import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Home from '../styles/Home.module.css'
import { IoLocationSharp } from 'react-icons/io5'
import { Icon, Box } from '@chakra-ui/react'
import { BottomSheetRef } from "react-spring-bottom-sheet";

type PlacesProps = {
  setCurrentLocation: (position: google.maps.LatLngLiteral) => void;
  sheetRef?: React.MutableRefObject<BottomSheetRef>;
};

export default function Places({ setCurrentLocation, sheetRef }: PlacesProps) {

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setCurrentLocation({ lat, lng });
    sheetRef?.current.snapTo(60, { source: 'snap-to-bottom' })
  };

  console.log({status, data})

  return (
    <Box 
      position='relative'
    >
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className={Home.comboboxInput}
            placeholder="Search office address"
          />
          <ComboboxPopover portal={false}>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <Icon position='absolute' left={{base:'95%', md: '98%'}} top='2' as={IoLocationSharp} color='#00CA90' />
    </Box>

  );
}