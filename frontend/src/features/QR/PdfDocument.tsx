import React, { FC } from "react";
import { Image, Page, Text, View, Document } from "@react-pdf/renderer";

interface PdfDocumentProps {
  chunks: { table: string; qr: string }[][];
}

const PdfDocument: FC<PdfDocumentProps> = ({ chunks }: PdfDocumentProps) => {
  return (
    <Document>
      {
        // Render pages with max 6 qr codes
        chunks.map((tableChunk, index) => {
          return (
            <Page
              key={index}
              size="A4"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {
                // Render each qr code
                tableChunk.map((t, index) => (
                  <View
                    key={index}
                    style={{
                      width: 250,
                      height: 250,
                      margin: "10pt",
                    }}
                  >
                    <Image src={t.qr} />
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        top: "-20pt",
                      }}
                    >
                      {t.table}
                    </Text>
                  </View>
                ))
              }
            </Page>
          );
        })
      }
    </Document>
  );
};

export default PdfDocument;
