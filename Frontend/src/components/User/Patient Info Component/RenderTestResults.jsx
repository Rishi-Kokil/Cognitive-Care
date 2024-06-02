import React from "react";
import { Trash2 } from 'lucide-react';
import formatDateTime from "../../../services/formatDate";
import axios from "axios";
import { useAuth } from "../../../context/authContext";


const RenderTestResults = ({ detectionResult, patient_id, setPageRefresh, pageRefresh }) => {

    const { token } = useAuth();

    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };


    const handleTestDelete = async (pId, tId) => {
        try {
            const response = await axios.post(`http://localhost:8080/user/deleteTest?patient_id=${pId}&test_id=${tId}`, null, axiosConfig);
            setPageRefresh(!pageRefresh);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        detectionResult && (
            <div className="scroll-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th
                                className="font-bold px-6 py-3 text-xs text-left text-gray-500 uppercase"
                            >
                                Result
                            </th>
                            <th
                                scope="col"
                                className="font-bold px-6 py-3 text-xs text-left text-gray-500 uppercase"
                            >
                                Timestamp
                            </th>
                            <th
                                scope="col"
                                className="font-bold px-6 py-3 text-xs text-left text-gray-500 uppercase"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {detectionResult.map((item, index) => (
                            <tr key={index} className="group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.result || `Marks: ${item.result}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {formatDateTime(item.TimeStamp)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Trash2
                                        className="cursor-pointer text-gray-400 transition-colors duration-300 group-hover:text-gray-900"
                                        onClick={() => {
                                            handleTestDelete(patient_id, item._id);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        )
    );
};

export default RenderTestResults;