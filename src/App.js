
import './App.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function App() {

  const [percent, setPersent] = useState('')
  const [amount, setAmount] = useState('')
  const [results, setResults] = useState([]);

  console.log(results)

  const calculate = () => {
    const percentFloat = parseFloat(percent);
    const amountInt = parseInt(amount);

    if (!isNaN(percentFloat) && !isNaN(amountInt)) {
      const bondPayments = [88, 88, 88, 88]; // Платежи за каждую дату
      const bondCount = amountInt; // Количество облигаций
      const totalInvestment = bondCount * bondPayments.reduce((a, b) => a + b, 0); // Общая сумма инвестиций
      const paymentDates = ['31.07.24', '29.01.25', '30.07.25', '28.01.26'];

      let total = 0


      const returns = bondPayments.map((payment, index) => {
        return {
          countBonds: amountInt,
          totalAmount: total += payment * bondCount,
          paymentDate: paymentDates[index], // Дата выплаты, укажите соответствующие даты
          totalReturn: (bondCount * payment).toFixed(2), // Общий доход на одну дату
          yield: ((bondCount * payment) / totalInvestment * 100).toFixed(2) // Доходность в процентах
        };
      });

      setResults(returns);
    } else {
      // Обработка ошибки ввода
      console.error('Invalid input');
    }
  };


  return (
    <div className="App">
      <Container>
        <div className='block'>
          <Form.Control
            placeholder="ставка %"
            value={percent}
            type='number'
            className='input'
            onChange={(e) => setPersent(e.target.value)}
          />
          <p>% ставка</p>
        </div>

        <div className='block'>
          <Form.Control
            placeholder="количество облигаций"
            value={amount}
            type='number'
            className='input'
            onChange={(e) => setAmount(e.target.value)}
          />
          <p>количество облигаций</p>
        </div>


        <Button variant='success' className='btn' onClick={calculate}>Расчитать</Button>


        <div className='block_results'>
          <h2>Результаты:</h2>
          {amount ?
            <p>{amount} облигаций = {amount * 1000} грн</p>
            :
            <></>
          }

          <table className="results-table">
            <thead>
              <tr>
                <th>Дата выплаты</th>
                <th>К-во облигаций</th>
                <th>доход</th>
                <th>Общий доход</th>
                <th>Доходность, %</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.paymentDate}</td>
                  <td>{result.countBonds}</td>
                  <td>{result.totalReturn}</td>
                  <td>{result.totalAmount}</td>
                  <td>{result.yield} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </Container >

    </div >
  );
}

export default App;
