import { useEffect, useState } from 'react';
import { BarChart, PieChart, ScatterChart } from '@mui/x-charts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {
  const [data, setData] = useState(null);
  const [document, setClientDocument] = useState('');

  const fetchData = async (documento) => {
    try {
      const response = await fetch(`https://2uppsxhj4j.execute-api.us-west-1.amazonaws.com/dev/getClientData?documento=${documento}`);
      const clientData = await response.json();
      setData(clientData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(document);
  }

  const categoryColors = [
    '#00c389',
    '#fdda24',
    '#ff7f41',
    '#59cbe8',
    '#9164cc',
    '#f5b6cd',
    '#FFCD56',
    '#C9CBCF',
    '#4D5360',
    '#E7E9ED',
    '#36A2EB',
    '#FF6384'
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className='h-[6vh] bg-[#2c2a29] flex items-center justify-between'>
        <span className='text-white px-8'>Prueba técnica</span>
        <img src="https://servicios.bam.com.gt/EfectoBAM/Resources/Generales/01_Logo.png" alt="" className='h-full mr-8'/>
      </header>

      <section className='min-h-[12vh] shadow-custom-bottom p-6 bg-white rounded-lg'>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-white focus:ring-[#fdda24] focus:border-[#fdda24]"
              placeholder="Ingrese el numero de documento..."
              required
              value={document}
              onChange={(e) => setClientDocument(e.target.value)}
            />
            <button
              type="submit"
              className="text-[#2c2a29] absolute right-2.5 bottom-2.5 bg-[#fdda24] hover:bg-[#fcca1d] focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Buscar
            </button>
          </div>
        </form>
      </section>

      <div className='flex flex-col min-h-[82vh]'>
      <main className='flex flex-grow px-[10%] py-12'>
        <div className='flex-1 flex flex-col justify-center items-start p-8'>
          <h1 className='text-3xl font-bold mb-4 text-center'>Visualización de Consumos de Clientes</h1>
          <p className='text-lg mb-4'>
            Explora y analiza los patrones de consumo de nuestros clientes a través de visualizaciones gráficas interactivas. Utiliza nuestra API para obtener datos detallados de cada cliente y obtén una visión completa de sus hábitos de gasto en diferentes categorías. Esta herramienta está diseñada para proporcionar información valiosa de manera clara y accesible, facilitando la toma de decisiones basadas en datos.
          </p>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <img src="https://images.ctfassets.net/d8tspqmagn8z/1kA8aD4QJbC4O5KOZU6S0V/5ce3d200c3312eea2b5ddcb856a16fd3/528x346-ahorro.webp" alt="" className='max-w-full rounded' />
        </div>
      </main>

      <div className='flex justify-center'>
        <hr className='my-4 w-4/5 border-gray-300' />
      </div>

      {data && (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 px-20 pt-8 pb-20">
          <div className="h-[50vh] col-span-1 px-4 py-12">
            <h2 className="text-xl font-semibold mb-8 text-[#2c2a29] text-center">Resultado</h2>
            <TableContainer component={Paper} className="mt-4 border-2">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Categoría</TableCell>
                    <TableCell align="right">Número de Transacciones</TableCell>
                    <TableCell align="right">Monto (mm)</TableCell>
                    <TableCell align="right">% del Monto Total</TableCell>
                    <TableCell align="right">% de Transacciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.categoria}>
                      <TableCell component="th" scope="row">
                        {row.categoria}
                      </TableCell>
                      <TableCell align="right">{row.num_trx}</TableCell>
                      <TableCell align="right">{row.mnt_trx_mm}</TableCell>
                      <TableCell align="right">{(row.pct_mnt_tot * 100).toFixed(2)}%</TableCell>
                      <TableCell align="right">{(row.pct_num_trx_tot * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="h-[50vh] col-span-1 px-4 pb-12">
            <h2 className="text-xl font-semibold mb-8 text-[#2c2a29] text-center">Monto de Transacciones por Categoría</h2>
            <BarChart
              xAxis={[{ scaleType: 'band', data: data.map(item => item.categoria) }]}
              series={[{
                data: data.map((item, index) => item.mnt_trx_mm)
              }]}
              colors={categoryColors}
            />
          </div>
          <div className="h-[50vh] col-span-1 px-4 py-12">
            <h2 className="text-xl font-semibold mb-8 text-[#2c2a29] text-center">Distribución del Monto Total por Categoría</h2>
            <PieChart
              series={[
                {
                  data: data.map((item, index) => ({
                    id: index,
                    value: item.pct_mnt_tot,
                    label: item.categoria,
                    color: categoryColors[index]
                  })),
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
            />
          </div>
          <div className="h-[50vh] col-span-1 px-4 py-12">
            <h2 className="text-xl font-semibold mb-8 text-[#2c2a29] text-center">Porcentaje de Transacciones y Monto Total por Categoría</h2>
            <BarChart
              series={[
                { label: '% de transacciones', data: data.map(item => item.pct_num_trx_tot) },
                { label: '% del monto total', data: data.map(item => item.pct_mnt_tot) },
              ]}
              xAxis={[{ scaleType: 'band', data: data.map(item => item.categoria) }]}
              stack={true}
              colors={categoryColors}
            />
          </div>
        </div>
      )}
      </div>

      <footer className='h-12 bg-[#2c2a29] flex items-center justify-center'>
        <span className='text-white px-8'>Desarrollado por Cristian Aguirre</span>
      </footer>
    </div>
  );
}

export default App;
