export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'success'
  | 'danger';

export type ButtonType = 'filled' | 'outlined';

export type ButtonProps = {
  className?:string,
  variant?: ButtonVariant;
  type?: ButtonType;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
};

export type IconButtonProps = Omit<ButtonProps,"type"|"loading">;

export type LoadingButtonProps = ButtonProps & {
  isLoading:boolean,
  loadingIcon?:"start"|"end"|"none";
};