import { GlobalStyleProvider } from '@phduylib/my-component';

type Props = {
  children:JSX.Element;
}

export  function AppStyleProvider(props:Props) {
  return (
    <GlobalStyleProvider>
        {props.children}
    </GlobalStyleProvider>
  )
}
