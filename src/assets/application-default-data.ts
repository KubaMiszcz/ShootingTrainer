import { IAppData } from "src/app/models/appData";

export const APP_DATA_JSON: IAppData = {
  procedures: [
    {
      name: 'MSBS',
      stages: [
        { name: 'start', actions: [], nextBlockName: 'step1' },
        {
          name: 'step1',
          actions: [
            { name: 'palec ze spustu', audioFileName: 'palec ze spustu.mp3' },
            {
              name: 'zabezpiecz bron',
              audioFileName: 'zabezpiecz bron.mp3',
              delay_sec: 1,
              isDisabled: true,
            },
            {
              name: 'cofnij i zablokuj suwadlo',
              audioFileName: 'cofnij i zablokuj suwadlo.mp3',
              delay_sec: 1,
            },
          ],
          nextBlockName: 'step2',
        },
        {
          name: 'step2',
          actions: [
            {
              name: 'podepnij magazynek',
              audioFileName: 'podepnij magazynek.mp3',
              isDisabled: true,
            },
            { name: 'obroc bron', audioFileName: 'obroc bron.mp3' },
            { name: 'patrz na komore', audioFileName: 'patrz na komore.mp3' },
            { name: 'zrzuc suwadlo', audioFileName: 'zrzuc suwadlo.mp3' },
          ],
          nextBlockName: 'czy naboj podany',
        },
        {
          name: 'naboj podany',
          actions: [
            { name: 'niska gotowosc', audioFileName: 'niska gotowosc.mp3' },
            { name: 'czekaj na sygnal', audioFileName: 'czekaj na sygnal.mp3' },
          ],
          nextBlockName: 'cel',
        },
        {
          name: 'cel',
          actions: [{ name: 'cel', audioFileName: 'cel.mp3' }],
          nextBlockName: 'step4',
        },
        {
          name: 'step4',
          actions: [
            { name: 'przyceluj', audioFileName: 'przyceluj.mp3' },
            { name: 'odbezpiecz bron', audioFileName: 'odbezpiecz bron.mp3' },
          ],
          nextBlockName: 'strzelaj dalej',
        },
        {
          name: 'strzelaj dalej',
          actions: [{ name: 'strzelaj', audioFileName: 'strzelaj.mp3' }],
          nextBlockName: 'czy strzelilo',
        },
        {
          name: 'cel trafiony',
          actions: [
            { name: 'palec ze spustu', audioFileName: 'palec ze spustu.mp3' },
            { name: 'zabezpiecz bron', audioFileName: 'zabezpiecz bron.mp3' },
          ],
          nextBlockName: 'naboj podany',
        },
        {
          name: 'deadEnd',
          actions: [{ name: 'koniec', audioFileName: 'koniec.mp3' }],
          nextBlockName: '',
        },
      ],
      deciders: [
        {
          name: 'czy naboj podany',
          audioFileName: 'czy naboj podany',
          positiveBlockName: 'naboj podany',
          negativeBlockName: 'deadEnd',
          positiveChance: 0.9,
        },
        {
          name: 'czy strzelilo',
          audioFileName: 'czy strzelilo.mp3',
          positiveBlockName: 'czy cel trafiony',
          negativeBlockName: 'deadEnd',
          positiveChance: 0.9,
        },
        {
          name: 'czy cel trafiony',
          audioFileName: 'czy cel trafiony.mp3',
          positiveBlockName: 'cel trafiony',
          negativeBlockName: 'strzelaj dalej',
          positiveChance: 0.6,
        },
      ],
      magazineCapacity: 30,
      defaultFailureChance: 0.25,
      isDefault: false,
    },
    {
      name: '9mm',
      stages: [],
      deciders: [],
      magazineCapacity: 12,
      defaultFailureChance: 0.25,
      isDefault: false,
    },
    {
      name: '3-way decider',
      stages: [
        { name: 'Krok4', actions: [] },
        { name: 'Krok3', actions: [] },
        { name: 'Krok2s', actions: [], nextBlockName: 'Decyzja1' },
        { name: 'start', actions: [{ name: 'NowaAkcja', audioFileName: '' }] },
      ],
      deciders: [
        {
          name: 'Decyzja3',
          audioFileName: '',
          positiveBlockName: 'Krok1',
          negativeBlockName: 'Decyzja2',
          positiveChance: 0.5,
        },
        {
          name: 'Decyzja2',
          audioFileName: '',
          positiveBlockName: 'Krok3',
          negativeBlockName: 'Krok4',
          positiveChance: 0.5,
        },
        {
          name: 'Decyzja1',
          audioFileName: '',
          positiveBlockName: 'Krok1',
          negativeBlockName: 'Decyzja2',
          positiveChance: 0.5,
        },
      ],
      magazineCapacity: 30,
      defaultFailureChance: 0.5,
      isDefault: true,
    },
  ],
  audioFilesPath: '../assets/audio/',
  maxPlaylistLength: 50,
  defaultAudioExtension: '.mp3',
};