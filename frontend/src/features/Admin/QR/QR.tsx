import React, { FC, useState } from "react";
import { Button, Input, InputNumber, Radio, Space, Typography } from "antd";
import styles from "./QR.module.scss";
import { Document, Image, Page, pdf, Text, View } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
var QRCode = require("qrcode");

const { Title } = Typography;

const QR: FC = () => {

	const [selectie, setSelectie] = useState<number>(0);
	const [table, setTable] = useState<string>("");
	const [start, setStart] = useState<number>(1);
	const [end, setEnd] = useState<number>(50);

	const generateQR = async (text: string): Promise<string> => {
		try {
			return QRCode.toDataURL(text, { type: "image/png", width: 300 });
		} catch (err) {
			console.error(err);
		}
		return "";
	};

	const generateTableList = (prefix: string, start: number, end: number): string[] => {
		if (end < start) return [];

		const tables = Array(end - start);
		for ( let t = start, i = 0; t <= end; t++, i++ ) {
			tables[i] = prefix + t;
		}

		return tables;
	};

	const PdfDoc = async (tables: string[]) => {

		const tableData = await Promise.all(tables.map<Promise<{ table: string, qr: string }>>( async (t) => {
			return {
				table: `http://excuze.lan   Tafel: ${t}`,
				qr: await generateQR(`http://excuze.lan?table=${t}`),
			};
		}));

		// Split tables into chunks of 6
		const chunks = [];
		for ( let i=0; i < tableData.length; i+=6 ) {
			chunks.push(tableData.slice(i, i + 6));
		}

		const blob = await pdf(<Document>

			{
				// Render pages with max 6 qr codes
				chunks.map((tableChunk) => {
					return <Page size="A4" style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "center"
					}}>

						{
							// Render each qr code
							tableChunk.map((t) => {
								return <View style={{
									width: 250,
									height: 250,
									margin: "10pt",
								}}>
									<Image src={t.qr}/>
									<Text style={{
										textAlign: "center",
										fontWeight: "bold",
										top: "-20pt"
									}}>
										{t.table}
									</Text>
								</View>;
							})
						}

					</Page>;
				})
			}
		</Document>).toBlob();
		saveAs(blob, "qr-codes.pdf");
	};

	return (
		<div className={styles.center}>
			<Space direction="vertical">
				<Title
					style={{ textAlign: "center" }}
					level={4}
				>Genereer QR codes</Title>
				<Radio.Group onChange={val => setSelectie(val.target.value)} value={selectie}>
					<Radio value={0}>
                        Genereer één QR-code
					</Radio>
					<Radio value={1}>
                        Genereer meerdere codes
					</Radio>
				</Radio.Group>
				{
					// Generate one code
					selectie === 0 ? <>
						<Input
							type="text"
							name="table"
							placeholder="Tafelnummer"
							onChange={val => setTable(val.target.value)}
							value={table}
						/>
						<Button onClick={() => PdfDoc([table])}>Genereer</Button>
					</>
						: <>
							<Space>
                                Nummers van
								<InputNumber
									name="start"
									placeholder="start"
									onChange={val => setStart(val as number)}
									value={start}
									style={{ width: "60px" }}
								/>
                                tot
								<InputNumber
									name="end"
									placeholder="eind"
									onChange={val => setEnd(val as number)}
									value={end}
									style={{ width: "60px" }}
								/>
							</Space>
							<Button onClick={() => PdfDoc(generateTableList("", start, end))}>Genereer</Button>
						</>
				}
			</Space>
		</div>
	);
};


export default QR;
