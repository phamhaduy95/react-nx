import { Stack } from "@mui/material"
import Button,{ buttonClasses, ButtonProps} from "@mui/material/Button"
import { styled } from "@mui/material/styles"

/** modify style using className */
// you can provide new name for the MUI component as the className. From there you can overrides any CSS property. 

/** modify style using styled-component approach  */
// styled with CSSProperties object as input
const StyledButtonVer1 = styled(Button)({  
    color:"black",
   
    [`&.${buttonClasses.containedPrimary}`]:{  
        color:"yellow",
        backgroundColor:"blue",
        display:"inline-block",
    }
  
})
// styled method also accept string template as input
const StyledButtonVer2 = styled(Button)`
    font-size:2rem;
    padding:0.5rem 1rem;
    display:inline-block;
    &.${buttonClasses.containedPrimary} {
        color:white;
        background-color: hsla(220,50%,80%,0.9);
    }`;

/** modify style using sx props. Any Material UI component consists sx props to override the style directly for single component*/

const SXButton = (props:ButtonProps)=>{
    return (
        <Button {...props} sx={{
            fontSize:"2rem",
            padding:"0.6rem 1rem",
        }}/>
    )
}

// it is good practice to make every components following one common themes so that your web app becomes consistent.you can access all themes props using styled

const ThemesButton = styled(Button)<ButtonProps>(({theme})=>({
    width:"250px",
    color: theme.palette.error.light,
    backgroundColor: theme.palette.action.active,
}));



export default function CustomizedButton() {
  console.log(buttonClasses)
  return (
    <Stack alignItems={"center"} spacing={2} justifyContent={"flex-start"}>
    
        <StyledButtonVer1 color="primary" variant='contained'>First</StyledButtonVer1>
        <StyledButtonVer2 color="primary" variant="contained">Second</StyledButtonVer2>
        <SXButton color="primary" variant="contained">Third</SXButton>
        <ThemesButton>Forth</ThemesButton>
    </Stack>
    
  )
}

