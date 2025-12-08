import { useTheme as usePaperTheme } from "react-native-paper";
import { AppTheme } from "../app/theme";

export const useAppTheme = () => usePaperTheme<AppTheme>();
