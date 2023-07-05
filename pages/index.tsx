import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import TextScorer from "@/components/TextScorer";
import { SHORTCUTS } from "@/utils/shortcut";
import { save } from "@/utils/ls";
import TextCompare from "@/components/TextCompare";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h2>Tutorial</h2>
        <p>Video walkthrough soon</p>

        <div>
          <h2>I need to Scrape MD files</h2>
          <p>Use this page to use Regex to scrape headers and score them</p>
          <p>Copy them into an MD file to use them with `string-regex`</p>
          <div>
         <Link href="/scrape"><button>Scrape Findings from MD</button></Link>
         </div>
        </div>
        <div>
        <h2>I need to Score MD files</h2>
          <p>Use this page to Score already scraped (and auto-judged files)</p>
          <p>Use `string-regex` to apply the Knowledge Base, then manually finish judging</p>
          <Link href="/score"><button>Judge Findings after Scraping</button></Link>
        </div>
      </div>
    </>
  );
}
