import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: "30px 30px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  itemCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  marginBottom: {
    marginBottom: "20px",
  },
  table: {
    width: "80%",
    margin: "20px 20px",
  },
  td: {
    padding: "6px",
  },
});
