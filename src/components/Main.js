import React from "react"
import { useState } from "react"
import { useEffect } from "react"

export default function Main() {
    const [coin, setCoin] = useState({
        "valorReal": "",
        "cotacaoDolar": "",
        "cotacaoEuro": ""
    })

    console.log(coin)

    function handleChange(event) {
        const { name, value } = event.target
        setCoin(prevCoin => ({
            ...prevCoin,
            [name]: value,
        }))
    }

    useEffect(() => {
        async function getValues() {
            const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
            const data = await res.json()
            setCoin(prevCoin => ({
                ...prevCoin,
                cotacaoDolar: data.USDBRL.high,
                cotacaoEuro: data.EURBRL.high
            }))
        }
        getValues()
    }, [])

    return (
        <main className="main">
            <label>Insira o valor em reais:</label>
            <input
                name="valorReal"
                type="text"
                placeholder="Digite o valor em reais aqui"
                className="main--input"
                onChange={handleChange}
                value={coin.valorReal}
            ></input><br></br>
            <label>O valor em dólares é:</label>
            <input
                name="ValorDolar"
                type="text"
                className="main--input"
                value={(coin.valorReal / coin.cotacaoDolar).toFixed(2)}
                disabled
            ></input><br></br>
            <label>O valor em euros é:</label>
            <input
                name="ValorEuro"
                type="text"
                className="main--input"
                value={(coin.valorReal / coin.cotacaoEuro).toFixed(2)}
                disabled
            ></input>
        </main>
    )
}