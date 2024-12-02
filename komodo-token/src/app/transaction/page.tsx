'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@/contexts/WalletContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Commodity {
  name: string
  price: number
  change: number
  supply: number
}

const dummyPriceHistory = [
  { date: '2023-01-01', price: 100 },
  { date: '2023-02-01', price: 102 },
  { date: '2023-03-01', price: 98 },
  { date: '2023-04-01', price: 105 },
  { date: '2023-05-01', price: 110 },
]

export default function TransactionPage() {
  const { address } = useWallet()
  const [commodities, setCommodities] = useState<Commodity[]>([])
  const [selectedCommodity, setSelectedCommodity] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [action, setAction] = useState<'buy' | 'sell'>('buy')

  useEffect(() => {
    // Fetch commodities and prices from API
    fetch('/api/commodities')
      .then(res => res.json())
      .then(data => setCommodities(data))
  }, [])

  const handleTransaction = () => {
    if (!address) {
      alert('Please connect your wallet to make a transaction.')
      return
    }
    // Handle buy/sell transaction
    fetch('/api/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commodity: selectedCommodity, amount, action, address })
    })
      .then(res => res.json())
      .then(data => {
        // Handle response (e.g., show success message, update user's portfolio)
        console.log(data)
      })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Token Transactions</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commodity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>24h Change</TableHead>
                  <TableHead>Available Supply</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commodities.map(commodity => (
                  <TableRow key={commodity.name}>
                    <TableCell>{commodity.name}</TableCell>
                    <TableCell>${commodity.price.toFixed(2)}</TableCell>
                    <TableCell className={commodity.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {commodity.change.toFixed(2)}%
                    </TableCell>
                    <TableCell>{commodity.supply.toLocaleString()} tokens</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyPriceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Buy/Sell Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select onValueChange={setSelectedCommodity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a commodity" />
                </SelectTrigger>
                <SelectContent>
                  {commodities.map(commodity => (
                    <SelectItem key={commodity.name} value={commodity.name}>
                      {commodity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <div className="flex space-x-4">
                <Button
                  onClick={() => setAction('buy')}
                  variant={action === 'buy' ? 'default' : 'outline'}
                >
                  Buy
                </Button>
                <Button
                  onClick={() => setAction('sell')}
                  variant={action === 'sell' ? 'default' : 'outline'}
                >
                  Sell
                </Button>
              </div>
              <Button onClick={handleButton onClick={handleTransaction}>
                {action === 'buy' ? 'Buy Tokens' : 'Sell Tokens'}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transaction Transparency</CardTitle>
          </CardHeader>
          <CardContent>
            <p>All transactions are recorded on the blockchain for full transparency. Each token is backed by physical commodities stored in secure facilities.</p>
            <Button className="mt-4" variant="outline" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">View Public Ledger</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

