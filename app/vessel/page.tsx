"use client";

import { useState, useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { callHttp } from "@/api/callApi";
import Search from "antd/es/input/Search";

interface DataType {
  vslCd: string;
  vslClssFlg: string;
  vslLoclNm: boolean;
  foilCapa: string;
  doilCapa: string;
  frshWtrCapa: object[];
}

const UserList = () => {
  interface TableParams {
    pagination?: TablePaginationConfig;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "vslCd",
      dataIndex: "vslCd",
      key: "vslCd",
      fixed: "left",
    },
    {
      title: "vslClssFlg",
      dataIndex: "vslClssFlg",
      key: "vslClssFlg",
    },
    {
      title: "vslLoclNm",
      dataIndex: "vslLoclNm",
      key: "3",
    },
    {
      title: "foilCapa",
      dataIndex: "foilCapa",
      key: "4",
    },
    {
      title: "doilCapa",
      dataIndex: "doilCapa",
      key: "5",
    },
    {
      title: "frshWtrCapa",
      dataIndex: "frshWtrCapa",
      key: "6",
    },
    {
      title: "callSgnNo",
      dataIndex: "callSgnNo",
      key: "callSgnNo",
    },
    {
      title: "rgstNo",
      dataIndex: "rgstNo",
      key: "rgstNo",
    },
    {
      title: "phnNo",
      dataIndex: "phnNo",
      key: "phnNo",
    },
    {
      title: "faxNo",
      dataIndex: "faxNo",
      key: "faxNo",
    },
    {
      title: "tlxNo",
      dataIndex: "tlxNo",
      key: "tlxNo",
    },
    {
      title: "vslEml",
      dataIndex: "vslEml",
      key: "vslEml",
    },
    {
      title: "piclbDesc",
      dataIndex: "piclbDesc",
      key: "piclbDesc",
    },
    {
      title: "rgstPortCd",
      dataIndex: "rgstPortCd",
      key: "rgstPortCd",
    },
    {
      title: "clssNoRgstAreaNm",
      dataIndex: "clssNoRgstAreaNm",
      key: "clssNoRgstAreaNm",
    },
    {
      title: "vslClssNo",
      dataIndex: "vslClssNo",
      key: "vslClssNo",
    },
    {
      title: "vslBldrNm",
      dataIndex: "vslBldrNm",
      key: "vslBldrNm",
    },
    {
      title: "loaLen",
      dataIndex: "loaLen",
      key: "loaLen",
    },
    {
      title: "lbpLen",
      dataIndex: "lbpLen",
      key: "lbpLen",
    },
    {
      title: "vslWdt",
      dataIndex: "vslWdt",
      key: "vslWdt",
    },
    {
      title: "vslDpth",
      dataIndex: "vslDpth",
      key: "vslDpth",
    },
    {
      title: "smrDrftHgt",
      dataIndex: "smrDrftHgt",
      key: "smrDrftHgt",
    },
    {
      title: "dwtWgt",
      dataIndex: "dwtWgt",
      key: "dwtWgt",
    },
    {
      title: "lgtShpTongWgt",
      dataIndex: "lgtShpTongWgt",
      key: "lgtShpTongWgt",
    },
    {
      title: "grsRgstTongWgt",
      dataIndex: "grsRgstTongWgt",
      key: "grsRgstTongWgt",
    },
    {
      title: "netRgstTongWgt",
      dataIndex: "netRgstTongWgt",
      key: "netRgstTongWgt",
    },
    {
      title: "pnmGtWgt",
      dataIndex: "pnmGtWgt",
      key: "pnmGtWgt",
    },
    {
      title: "pnmNetTongWgt",
      dataIndex: "pnmNetTongWgt",
      key: "pnmNetTongWgt",
    },
    {
      title: "suzGtWgt",
      dataIndex: "suzGtWgt",
      key: "suzGtWgt",
    },
    {
      title: "suzNetTongWgt",
      dataIndex: "suzNetTongWgt",
      key: "suzNetTongWgt",
    },
    {
      title: "mnEngMkrNm",
      dataIndex: "mnEngMkrNm",
      key: "mnEngMkrNm",
    },
    {
      title: "mnEngTpDesc",
      dataIndex: "mnEngTpDesc",
      key: "mnEngTpDesc",
    },
    {
      title: "mnEngBhpPwr",
      dataIndex: "mnEngBhpPwr",
      key: "mnEngBhpPwr",
    },
    {
      title: "vslOwnIndCd",
      dataIndex: "vslOwnIndCd",
      key: "vslOwnIndCd",
    },
    {
      title: "vslRgstCntCd",
      dataIndex: "vslRgstCntCd",
      key: "vslRgstCntCd",
    },
    {
      title: "vslBldCd",
      dataIndex: "vslBldCd",
      key: "vslBldCd",
    },
    {
      title: "crrCd",
      dataIndex: "crrCd",
      key: "crrCd",
    },
    {
      title: "fdrDivCd",
      dataIndex: "fdrDivCd",
      key: "fdrDivCd",
    },
    {
      title: "vslSvcSpd",
      dataIndex: "vslSvcSpd",
      key: "vslSvcSpd",
    },
    {
      title: "maxSpd",
      dataIndex: "maxSpd",
      key: "maxSpd",
    },
    {
      title: "ecnSpd",
      dataIndex: "ecnSpd",
      key: "ecnSpd",
    },
    {
      title: "crwKnt",
      dataIndex: "crwKnt",
      key: "crwKnt",
    },
    {
      title: "lloydNo",
      dataIndex: "lloydNo",
      key: "lloydNo",
    },
    {
      title: "creUsrId",
      dataIndex: "creUsrId",
      key: "creUsrId",
    },
    {
      title: "creDt",
      dataIndex: "creDt",
      key: "creDt",
    },
    {
      title: "updUsrId",
      dataIndex: "updUsrId",
      key: "updUsrId",
    },
    {
      title: "updDt",
      dataIndex: "updDt",
      key: "updDt",
    },
    {
      title: "deltFlg",
      dataIndex: "deltFlg",
      key: "deltFlg",
    },
    {
      title: "eaiEvntDt",
      dataIndex: "eaiEvntDt",
      key: "eaiEvntDt",
    },
    {
      title: "eaiIfId",
      dataIndex: "eaiIfId",
      key: "eaiIfId",
    },
    {
      title: "modiVslCd",
      dataIndex: "modiVslCd",
      key: "modiVslCd",
    },
  ];

  const [dataList, setDataList] = useState([]);
  const [totalData, setTotal] = useState(0);
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    getListTableData(1, 3);
  }, [textSearch]);

  const getListTableData = async (page: number, limit: number) => {
    const searchData = await callHttp({
      method: "get",
      url: `http://localhost:3006/vessel`,
      paramList: {
        page,
        limit,
        vsl: textSearch,
      },
    });

    setDataList(searchData.data.data);
  };

  return (
    <div className="m-4 p-8 rounded shadow-2xl drop-shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="input mail"
          allowClear
          onSearch={(e) => setTextSearch(e)}
          style={{ width: 200 }}
          enterButton
        />
      </div>

      <Table
        className="p-4"
        columns={columns}
        dataSource={dataList}
        pagination={{
          total: totalData,
          onChange: (page, pageSize) => {
            getListTableData(page, pageSize);
          },
          pageSize: 3,
        }}
        scroll={{ x: 5000 }}
        rowKey={(record) => record.vslCd}
      />
    </div>
  );
};

export default UserList;
