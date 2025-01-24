import { Document, Page, PDFViewer, Text, View } from "@react-pdf/renderer";
import { styles } from "./style";
import { useLoaderData } from "react-router-dom";
import { Table, TH, TD } from "@ag-media/react-pdf-table";
import { format } from "date-fns";

const ApprovalDoc = () => {
  const [reqAsset] = useLoaderData();
  const today = new Date();
  const printDate = format(today, "dd-MM-yyyy");

  const {
    reqStatus,
    reqNotes,
    reqName,
    reqEmail,
    reqDate,
    assetType,
    assetName,
    assetCompany,
    approvedDate,
  } = reqAsset || {};
  const ApprovalPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.marginBottom}>
            <Text style={styles.textBold}>
              Approval Document for : {assetName}
            </Text>
          </View>
          <View style={[styles.spaceY, styles.marginBottom]}>
            <Text style={[styles.title, styles.textBold]}>
              Company : {assetCompany}
            </Text>
            <Text>
              Requested Date :{" "}
              {reqDate && format(new Date(reqDate), "dd-MM-yyyy")}
            </Text>
            <Text>
              Approved Date :{" "}
              {approvedDate && format(new Date(approvedDate), "dd-MM-yyyy")}
            </Text>
          </View>
        </View>

        <View style={styles.itemCenter}>
          <View style={[styles.spaceY]}>
            <Text style={[styles.textBold]}>Issued To : {reqName}</Text>
          </View>

          {/* render table */}
          <Table style={styles.table}>
            <TH>
              <TD style={styles.td}>Contact Info : </TD>
              <TD style={styles.td}>{reqEmail}</TD>
            </TH>
            <TH>
              <TD style={styles.td}>Asset Name : </TD>
              <TD style={styles.td}>{assetName}</TD>
            </TH>
            <TH>
              <TD style={styles.td}>Quantity : </TD>
              <TD style={styles.td}>1</TD>
            </TH>
            <TH>
              <TD style={styles.td}>Asset Type : </TD>
              <TD style={styles.td}>{assetType}</TD>
            </TH>
            <TH>
              <TD style={styles.td}>Additional Notes : </TD>
              <TD style={styles.td}>{reqNotes}</TD>
            </TH>
            <TH>
              <TD style={styles.td}>Status : </TD>
              <TD style={styles.td}>{reqStatus}</TD>
            </TH>
          </Table>
        </View>
        <View>
          <Text style={[styles.textBold, styles.marginBottom]}>
            Print Date : {printDate}
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <div className="w-full h-[650px]">
        <PDFViewer width="100%" height="100%">
          <ApprovalPDF></ApprovalPDF>
        </PDFViewer>
      </div>
    </div>
  );
};

export default ApprovalDoc;
