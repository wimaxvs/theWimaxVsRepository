import { StyleSheet } from "@react-pdf/renderer";

const useFirstDocStyles = () => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      width: "100%",
      height: "100%",
      minWidth: "375px",
      minHeight: "530.324px",
      maxWidth: "500px",
      maxHeight: "707.1px",
    },
    view: {
      margin: 10,
      padding: 10,
      // flexGrow: 1,
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
    },
    document: {
      width: "70%",
      height: "90%",
      minWidth: "385px",
      minHeight: "530.324px",
      maxWidth: "510px",
      maxHeight: "717.1px",
      marginRight: 0,
      border: "none",
      borderRadius: "12px",
      background: "linear-gradient(to top right, #343e83, #492a68)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
    },

    downloadLink: {
      width: "50%",
      borderRadius: "12px",
      backgroundColor: "#4283ad",
      padding: "12px",
      color: "white",
      fontWeight: 500,
    },
  });

  return { styles };
};

export default useFirstDocStyles;
