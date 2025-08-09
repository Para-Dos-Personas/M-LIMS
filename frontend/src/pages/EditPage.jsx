import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComponentById } from '../services/componentService';
import EditComponent from '../components/EditComponent';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);

  useEffect(() => {
    async function fetchComponent() {
      try {
        const { data } = await getComponentById(id);
        setComponent(data);
      } catch (err) {
        console.error('Failed to fetch component:', err);
      }
    }
    fetchComponent();
  }, [id]);

  return component ? (
    <EditComponent
      component={component}
      onSuccess={(updated) => {
        // Optionally redirect or re-fetch the component list
        navigate('/components');
      }}
    />
  ) : (
    <p>Loading...</p>
  );
}

export default EditPage;