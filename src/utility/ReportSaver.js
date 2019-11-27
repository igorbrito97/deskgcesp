import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import logoHeader from "assets/img/gcesp/header.png";
import {
    Table,
    TableHeader,
    TableBody,
    DataTableCell,
    TableCell
} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
    header: {
        display: 'row',
        alignContent: "center",
        padding: 10,
        textAlign: "center",
    },
    imageHeader: {
        padding: 15,
        height: 330,
        width: 1395,
    },
    reportTitle: {
        fontSize: 18,
        fontFamily: 'Helvetica',
        fontWeight: 800
    },
    // tableHeader: {
    //     fonsize: 16
    // },
    // tableRow: {
    //     fontFamily: 'Times-Roman',
    //     fontSize: 14
    // }
})

export function PdfDocument(props) { 
    console.log('porps',props);
    return (
        <Document>
            <Page size="A4">
                <View style={styles.header}>
                    <Image
                        source={logoHeader}
                        fixed
                    />
                    <Text style={styles.reportTitle}>
                        Relatório de {props.report.label}
                    </Text>
                </View>
                <Table data={props.data}>
                    <TableHeader>
                    {
                        props.report && props.report.columns &&
                        props.report.columns.map((item,index) => {
                            return (
                                <TableCell key={index}>{item}</TableCell>
                            );
                        })
                    }
                    </TableHeader>
                        {/* <DataTableCell getContent={(r) => r.name}/>
                        <DataTableCell getContent={(r) => r.phone}/> */}
                    {
                      props.report.value === 'topicoArea' ?
                      <TableBody>
                        <DataTableCell getContent={(r) => r.area.areaforum_nome} />
                        <DataTableCell getContent={(r) => r.qntdTopicos + ''} />
                      </TableBody>
                      : props.report.value === 'ticketArea' ? 
                      <TableBody>
                        <DataTableCell getContent={(r) => r.area.areaticket_nome} />
                        <DataTableCell getContent={(r) => r.qntdTickets + ''} />
                      </TableBody>
                      : props.report.value === 'docEleitoralCap' ?
                      <TableBody>
                        <DataTableCell getContent={(r) =>
                          r.capitulo.cap_nome + ' n° '+ r.capitulo.cap_numero
                         } />
                        <DataTableCell getContent={(r) => r.capitulo.cap_cidade} />
                        <DataTableCell getContent={(r) => r.docsEnviados + ''} />
                      </TableBody>
                      : props.report.value === 'regInternoCap' ?
                      <TableBody>
                        <DataTableCell getContent={(r) => 
                        r.capitulo.cap_nome + ' n° '+ r.capitulo.cap_numero
                        } />
                        <DataTableCell getContent={(r) => r.capitulo.cap_cidade} />
                        <DataTableCell getContent={(r) => r.regEnviados + ''} />
                        <DataTableCell getContent={(r) => (r.regEnviados > 0) ? (r.regAprovado) ? 'Sim' : 'Não' : '-'} />
                      </TableBody>
                      : props.report.value === 'chevalierCap' ?
                      <TableBody>
                        <DataTableCell getContent={(r) => r.nome} />
                        <DataTableCell getContent={(r) => 
                        r.capitulo.cap_nome + ' n° '+ r.capitulo.cap_numero
                        } />
                        <DataTableCell getContent={(r) => r.dataEnvio} />
                        <DataTableCell getContent={(r) => r.status} />
                      </TableBody>
                      : props.report.value === 'downloads' ?
                      <TableBody>
                        <DataTableCell getContent={(r) => r.nome} />
                        <DataTableCell getContent={(r) => r.downloaded + ''} />
                      </TableBody>
                      : 
                      <TableBody></TableBody>
                    }
                </Table>
            </Page>
        </Document>
    );  
}
