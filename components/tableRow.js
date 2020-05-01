import React from "react";
import { StyleSheet } from "react-native";

import { Table, Row } from "react-native-table-component";

import {
  HEADER_COLOR,
  TABLE_BORDER_COLOR,
  RIGH_PANE_BACKGROUND_COLOR_1,
} from "../constants";

const TableRow = (props) => {
  const {
    hieghtArray,
    array,
    position,
    backgroundColor,
    textColor,
    fontWeight,
  } = props;
  return (
    <Table
      borderStyle={{
        borderWidth: 1,
        borderColor: TABLE_BORDER_COLOR,
      }}
    >
      {array.map((rowData, index) => (
        <Row
          key={index}
          data={rowData}
          widthArr={hieghtArray.slice(position, position + 1)}
          heightArr={hieghtArray}
          style={[
            styles.col,
            index % 2 && { backgroundColor: backgroundColor },
            index == 0 && { backgroundColor: HEADER_COLOR },
          ]}
          textStyle={[
            styles.text,
            { fontWeight: fontWeight },
            styles.headerTextStyle,
            index > 0 && { fontSize: 12, color: textColor },
          ]}
        />
      ))}
    </Table>
  );
};

const styles = StyleSheet.create({
  text: { textAlign: "center", fontSize: 10 },
  col: { height: 40, backgroundColor: RIGH_PANE_BACKGROUND_COLOR_1 },
});

export default TableRow;
