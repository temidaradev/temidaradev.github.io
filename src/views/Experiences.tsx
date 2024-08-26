import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import ProjectItem from '../components/ProjectItem';
import ProjectSkeleton from '../components/ProjectSkeleton';
import useHandling from '../hooks/use-handling';
import ProjectModel from '../models/ProjectModel';
import github, { Direction, RepositorySort, RepositoryType } from '../services/github';

const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12`;

const Title = tw.h2`text-2xl text-slate-700`;

const List = tw.div`mt-8 grid grid-cols-1 lg:grid-cols-2 gap-2`;

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  const [loadingProjects, loadProject] = useHandling(
    useCallback(async () => {
      const list = await github.listRepositories({
        type: RepositoryType.All,
        sort: RepositorySort.Pushed,
        direction: Direction.Desc,
        page: 1,
        pageSize: 50,
      });

      setProjects(
        list
          .map(ProjectModel.from)
          .filter((p) => p.stargazersCount >= 0 && !p.archived && !p.disabled)
          .sort((a, b) => b.stargazersCount - a.stargazersCount),
      );
    }, []),
    true,
  );

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <Wrapper>
      <Title>{t('experiences.title')}</Title>

      <List>
        <div>
          <h2>Tools</h2>
          <p>Git</p>
        </div>
        <div>  
          <h1>Technologies</h1>
        </div>
        <div> 
          <h1>Languages</h1>
        </div>
        <div>
          <h1>Frontend Frameworks</h1>
        </div>  
        <div>
          <h1>Backend Frameworks</h1>
        </div>
        <div>  
          <h1>Libraries</h1>
        </div>
        <div>    
          <h1>Databases</h1>
        </div> 
        </List>
    </Wrapper>
  );
}