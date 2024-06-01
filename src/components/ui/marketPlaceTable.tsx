import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ethers } from 'ethers';
import Image from 'next/image';
import * as React from 'react';

import { BuyNft } from '@/lib/func';

import { IndianModelCardData } from '@/utils/modelData';
import { toastStyles } from '@/lib/utils';
import toast from 'react-hot-toast';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#130D1A',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: '#130D1A',
    color: theme.palette.common.white,
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

function createData(
  tokenId: any,
  id: number,
  icon: any,
  name: string,
  floor: number,
  floor1d: number,
  volume: number,
  TopOffer: number,
  Sales: number,
  Listed: number
) {
  return {
    icon,
    name,
    floor,
    floor1d,
    volume,
    TopOffer,
    Sales,
    Listed,
    id,
    tokenId,
  };
}

const rows = IndianModelCardData.map((model) => {
  const randomNum = Math.floor(Math.random() * 10) + 1; // Generating a random number between 1 and 100
  const newListPrice = model.ListPrice - randomNum; // Adding the random number to the original listPrice
  return createData(
    model.tokenId,
    model.id,
    model.icon,
    model.name,
    model.ListPrice,
    model.value,
    model.views,
    newListPrice,
    model.Tease,
    model.posts
  );
});

export default function CustomizedTables() {
  const [provider, setProvider] = React.useState<any>(undefined);
  React.useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      setProvider(provider);
    }
  }, []);
  const handleBuyNft = async (modelId: any, tokenId: any) => {
    console.log(localStorage.getItem(modelId) === tokenId);
    toast.loading('Buying NFT', toastStyles);
    const resp = await BuyNft(provider, tokenId);
    console.log(resp);
    if (resp.dispatch) {
      toast.success('NFT successfully purchased', toastStyles);
      localStorage.setItem(modelId, tokenId);
    }
  };
  return (
    <TableContainer
      component={Paper}
      className='w-[1100px]  bg-[#130D1A] text-white border-fuchsia-700 border'
      sx={{ border: 'none' }}
    >
      <Table
        sx={{ minWidth: 100, border: 'none' }}
        aria-label='customized table'
      >
        <TableHead>
          <TableRow className=''>
            <StyledTableCell align='left'>#</StyledTableCell>
            <StyledTableCell align='left'>collection</StyledTableCell>
            <StyledTableCell align='right'>floor</StyledTableCell>
            <StyledTableCell align='right'>floor&nbsp;1d</StyledTableCell>
            <StyledTableCell align='right'>volume</StyledTableCell>
            <StyledTableCell align='right'>Top Offer</StyledTableCell>
            <StyledTableCell align='right'>Sales</StyledTableCell>
            <StyledTableCell align='right'>Listed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component='th' scope='row'>
                <Image
                  src={row.icon}
                  className='w-10 h-10 rounded-full'
                  alt='modelIcon'
                />
              </StyledTableCell>
              <StyledTableCell component='th' scope='row'>
                <div className='flex items-center  gap-2 '>
                  {row.name}
                  <svg
                    onClick={() =>
                      localStorage.getItem(row.id.toString()) !== row.tokenId &&
                      handleBuyNft(row.id, row.tokenId)
                    }
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className={`${
                      localStorage.getItem(row.id.toString()) !== row.tokenId
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }' hover:text-fuchsia-600 w-5 h-5'`}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                </div>
              </StyledTableCell>

              <StyledTableCell align='right'>
                {row.floor}
                <span className='text-slate-400'>USDC</span>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <span className='text-green-500 items-center flex  justify-end gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941'
                    />
                  </svg>
                  {row.floor1d} %
                </span>
              </StyledTableCell>
              <StyledTableCell align='right'>
                {row.volume}
                <span className='text-slate-400'>USDC</span>
              </StyledTableCell>
              <StyledTableCell align='right'>
                {row.TopOffer} USDC
              </StyledTableCell>
              <StyledTableCell align='right'>{row.Sales}</StyledTableCell>
              <StyledTableCell align='right'>{row.Listed}%</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div onClick={handleBuyNft}>Buy</div> */}
    </TableContainer>
  );
}
