
import './App.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { BarChart } from './components/BarChart';

function App() {

  const [percent, setPersent] = useState('')
  const [amount, setAmount] = useState('')
  const [numPayments, setNumPayments] = useState('4')
  const [results, setResults] = useState([]);

  const generatePaymentDates = (startDate, numPayments) => {
    const paymentDates = [];
    let currentDate = new Date(startDate); // Преобразовываем строку начальной даты в объект Date

    // Генерируем даты для указанного количества платежей
    for (let i = 0; i < numPayments; i++) {
      // Добавляем полгода к текущей дате
      currentDate.setMonth(currentDate.getMonth() + 6);
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Добавляем ведущий ноль, если месяц состоит из одной цифры
      const year = currentDate.getFullYear().toString().slice(-2); // Берем последние две цифры года
      const paymentDate = `${currentDate.getDate()}.${month}.${year}`;
      paymentDates.push(paymentDate);
    }

    return paymentDates;
  };
  const startDate = '2024-01-30'; // Начальная дата в формате год-месяц-день
  const numPaymentss = numPayments; // Количество платежей


  const calculate = () => {
    const percentFloat = parseFloat(percent);
    const amountInt = parseInt(amount);

    if (!isNaN(percentFloat) && !isNaN(amountInt)) {
      // const paymentDates = ['31.07.24', '29.01.25', '30.07.25', '28.01.26'];
      const paymentDates = generatePaymentDates(startDate, numPaymentss);
      const array = Array.from({ length: numPayments }, (_, index) => index + 1);

      let totalAmount = 0;
      const returns = array.map((paymentDate, index) => {
        const countBonds = amountInt; // Количество облигаций
        const totalPerDate = countBonds * percentFloat * 10; // Доход на дату выплаты
        totalAmount += totalPerDate; // Общий доход к данной дате
        return {
          paymentDate: paymentDates[index],
          countBonds: countBonds,
          totalPerDate: totalPerDate / 2,
          totalAmount: totalAmount / 2,
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

        <div className='block'>
          <Form.Control
            placeholder="количество платежей"
            value={numPayments}
            type='number'
            className='input'
            onChange={(e) => setNumPayments(e.target.value)}
          />
          <p>количество облигаций</p>
        </div>

        <Button variant='success' className='btn' onClick={calculate}>Расчитать</Button>

        <div className='block_results'>
          <h2>Результаты:</h2>
          {amount ?
            <p>{amount.toLocaleString()} облигаций = {(amount * 1000).toLocaleString()} грн</p>
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
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.paymentDate}</td>
                  <td>{result.countBonds}</td>
                  <td>{result.totalPerDate}</td>
                  <td>{result.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BarChart data={results} />

      </Container >

    </div >
  );
}

export default App;
