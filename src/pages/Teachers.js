import React, { useEffect, useState } from "react";
import { getTeachers } from "../api";

export default function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [teachersData, setTeachersData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    useEffect(() => {
      fetchTeachers();
    }, [page, limit]);

    const fetchTeachers = async () => {
      try {
        const data = await getTeachers(page, limit);
        setTeachers(data);
        setTeachersData(data.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    const handleItemsPerPageChange = (e) => {
      setLimit(Number(e.target.value));
      setPage(1);
    };

    const totalPages = Math.ceil(teachers.totalTeachers / limit);

    return (
      <div className="container">
        <div className="tableHeader">
          <p className="tableItems" style={{"flex":"2"}}>Mã</p>
          <p className="tableItems" style={{"flex":"5"}}>Giáo Viên</p>
          <p className="tableItems" style={{"flex":"4"}}>Trình Độ (cao nhất)</p>
          <p className="tableItems" style={{"flex":"2"}}>Bộ Môn</p>
          <p className="tableItems" style={{"flex":"3"}}>TT Công Tác</p>
          <p className="tableItems" style={{"flex":"2"}}>Địa Chỉ</p>
          <p className="tableItems" style={{"flex":"2"}}>Trạng Thái</p>
          <p className="tableItems" style={{"flex":"2"}}>Hành Động</p>
        </div>

        <div className="tableContent">
          <ul>
            {teachersData.map((teacher) => (
              <li className="tableItem" key={teacher._id}>
                <p className="tableSubItems" style={{"flex":"2"}}>{teacher.code}</p>
                <div className="teacherDiv" style={{"flex":"5"}}>
                  <img className="teacherIcon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8aoXHy-QszyMu9jhKuaj4kg99flkdhERyw&s"/>
                  <div style={{"flex":"3"}} className="teacherInfo">
                    <p className="tableItems">{teacher.name}</p>
                    <p style={{'fontSize':"1.75vmin"}}>{teacher.email}</p>
                    <p style={{'fontSize':"2vmin"}}>{teacher.phoneNumber}</p>
                  </div>
                </div>
                <div className="levelDiv" style={{"flex":"4"}}>
                  <p style={{'fontSize':"2vmin"}}>Bậc: {teacher.degrees[0].type}</p>
                  <p style={{'fontSize':"2vmin"}}>Chuyên Ngành: {teacher.degrees[0].major}</p>
                </div>
                <p className="tableSubItems" style={{"flex":"2"}}>N/A</p>
                <p className="tableSubItems" style={{"flex":"3"}}>{teacher.teacherPositions[0].code}</p>
                <p className="tableSubItems" style={{"flex":"2"}}>{teacher.address}</p>
                <p className="tableSubItems" style={{"flex":"2"}}>{teacher.isActive ? "Đang Công Tác" : ""}</p>
                <p className="tableSubItems" style={{"flex":"2"}}>Hành Động</p>
              </li>
            ))}
          </ul>

          <div className="paginationControls">

            <div>
              <p>Total Teachers: {teachers.totalTeachers}</p>
            </div>
            <div className="paginationButtons">
                <button 
                    className="paginationBtn prev" 
                    disabled={page === 1} 
                    onClick={() => setPage(page - 1)}>
                    {"<"}
                </button>
                {page > 3 && (
                    <button 
                    className="paginationBtn" 
                    onClick={() => setPage(page - 3)}>
                    {page - 3}
                    </button>
                )}
                {page > 2 && (
                    <button 
                    className="paginationBtn" 
                    onClick={() => setPage(page - 2)}>
                    {page - 2}
                    </button>
                )}
                {page > 1 && (
                    <button 
                    className="paginationBtn" 
                    onClick={() => setPage(page - 1)}>
                    {page - 1}
                    </button>
                )}
                <button 
                    className="paginationBtn current" 
                    disabled>
                    {page}
                </button>
                {page < totalPages && (
                    <button 
                    className="paginationBtn" 
                    onClick={() => setPage(page + 1)}>
                    {page + 1}
                    </button>
                )}
                {page < totalPages - 1 && (
                    <button 
                    className="paginationBtn" 
                    onClick={() => setPage(page + 2)}>
                    {page + 2}
                    </button>
                )}
                {page < totalPages - 2 && (
                    <button 
                    className="paginationBtn" 
                    onClick={() => setPage(page + 3)}>
                    {page + 3}
                    </button>
                )}
                <button 
                    className="paginationBtn next" 
                    disabled={page === totalPages} 
                    onClick={() => setPage(page + 1)}>
                    {">"}
                </button>
            </div>
            <div>
              <select value={limit} onChange={handleItemsPerPageChange}>
                <option value={10}>10/trang</option>
                <option value={20}>20/trang</option>
                <option value={50}>50/trang</option>
                <option value={100}>100/trang</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
}