import { useSnackbar } from "notistack";
import { snackbarVariant } from "../constants/Index";

export function useSnackbarManager() {
    const { enqueueSnackbar } = useSnackbar();

    const fnShowSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };

    const fnShowSuccessSnackbar = (message) => {
        enqueueSnackbar((message || "success"), { variant: snackbarVariant.success });
    };

    const fnShowErrorSnackbar = (message) => {
        enqueueSnackbar((message || "some error occured here"), { variant: snackbarVariant.error });
    };

    const fnShowInfoSnackbar = (message) => {
        enqueueSnackbar(message, { variant: snackbarVariant.info });
    };

    const fnShowWarningSnackbar = (message) => {
        enqueueSnackbar(message, { variant: snackbarVariant.warning });
    };

    return {
        fnShowSnackbar,
        fnShowSuccessSnackbar,
        fnShowErrorSnackbar,
        fnShowInfoSnackbar,
        fnShowWarningSnackbar
    }
}