import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import EULER_SOLUTIONS from '../../euler-solutions';

type Props = {
  key: string; // https://reactjs.org/docs/lists-and-keys.html#keys
  id: string;
  title: string;
  html: string;
};

export default function Solution({ id, title, html }: Props) {
  const solutionFn = EULER_SOLUTIONS[id];

  const solutionIds = Object.keys(EULER_SOLUTIONS);
  const currentSolutionIdx = solutionIds.indexOf(id);
  const prevSolutionId = solutionIds[currentSolutionIdx-1];
  const nextSolutionId = solutionIds[currentSolutionIdx+1];

  const [solution, setSolution] = useState(null);
  const runSolution = useCallback(async () => setSolution(await solutionFn()), []);

  return (
    <>
      {prevSolutionId && (
        <Link href={{ pathname: '/solutions/[id]', query: { id: prevSolutionId }}}>
          <a>Previous</a>
        </Link>)}
        {nextSolutionId && (
          <Link href={{ pathname: '/solutions/[id]', query: { id: nextSolutionId }}}>
            <a>Next</a>
          </Link>)}
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <h2>Answer: {solution
        ? (<strong><code>{solution}</code></strong>)
        : <button onClick={runSolution}>Run</button>}
      </h2>
      <pre>{solutionFn.toString()}</pre>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: Object.keys(EULER_SOLUTIONS).map((id) => ({ params: { id }})),
});

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { id: paramId } = context.params;
  const id = Array.isArray(paramId) ? paramId[0] : paramId;

  const [ page, html ] = await Promise.all([
    fetch(`https://projecteuler.net/problem=${id}`)
      .then(res => res.text()),
    fetch(`https://projecteuler.net/minimal=${id}`)
      .then(res => res.text()),
  ]);

  const [ , title ] = page.match(/<h2>(.+?)<\/h2>/) || [];

  return {
    props: {
      key: id,
      id,
      title,
      html: html.replace('<a href="project/resources/', '<a target="_blank" href="/'),
    }
  }
};
