import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/projects/${id}`)
            .then(response => {
                setProject(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении проекта:', error);
            });
    }, [id]);

    if (!project) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
            {/* Здесь можно добавить дополнительную информацию о проекте */}
        </div>
    );
};

export default ProjectDetail;
