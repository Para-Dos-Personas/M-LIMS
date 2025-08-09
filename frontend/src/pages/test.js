function TestEnvPage({ apiUrl }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Environment Variable Test</h1>
      <p>The build process sees NEXT_PUBLIC_API_URL as:</p>
      <pre
        style={{ 
          background: '#eee', 
          padding: '1rem', 
          border: '1px solid #ccc',
          fontWeight: 'bold'
        }}
      >
        {apiUrl || "--- UNDEFINED ---"}
      </pre>
    </div>
  );
}

// This code runs at BUILD TIME on the server
export async function getStaticProps() {
  return {
    props: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL || null,
    },
  };
}

export default TestEnvPage;