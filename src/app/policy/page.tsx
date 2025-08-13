/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    d3: any;
    echarts: any;
  }
}

export default function PolicyDashboard(): React.ReactElement {
  const [scriptsLoaded, setScriptsLoaded] = useState({ d3: false, echarts: false });

  useEffect(() => {
    if (!(scriptsLoaded.d3 && scriptsLoaded.echarts)) return;

    const d3 = window.d3;
    const echarts = window.echarts;

    // Enhanced data structure combining both approaches
    const policyData = {
      name: "정책지표",
      children: [
        {
          name: "전환",
          color: "#B9E300",
          icon: "⚡",
          description: "에너지 전환 정책의 핵심 지표들을 추적합니다",
          target: 85,
          current: 72,
          children: [
            { 
              name: "재생에너지비중", 
              size: 35, 
              unit: "%", 
              value: 72,
              description: "전체 전력 생산에서 재생에너지가 차지하는 비율",
              trend: [58, 62, 66, 68, 70, 72],
              lawData: "신에너지 및 재생에너지 개발·이용·보급 촉진법"
            },
            { 
              name: "태양광 자가발전 비율", 
              size: 25, 
              unit: "kWh/원", 
              value: 68,
              description: "경제 단위당 전력 소비 효율성",
              trend: [60, 62, 64, 65, 67, 68],
              lawData: "에너지이용 합리화법"
            },
            { 
              name: "1차 에너지 공급량 중 신재생에너지 비중", 
              size: 20, 
              unit: "%", 
              value: 78,
              description: "전력망 안정성 지수",
              trend: [70, 72, 74, 75, 76, 78],
              lawData: "전기사업법"
            },
            { 
                name: "전력 자립도", 
                size: 20, 
                unit: "%", 
                value: 78,
                description: "전력망 안정성 지수",
                trend: [70, 72, 74, 75, 76, 78],
                lawData: "전기사업법"
              }
          ]
        },
        {
          name: "건물",
          color: "#FF6B3D",
          icon: "🏢",
          description: "건물 에너지 효율화 및 친환경 건축 정책",
          target: 75,
          current: 68,
          children: [
            { 
              name: "건물효율등급", 
              size: 30, 
              unit: "등급", 
              value: 3.2,
              description: "건물 에너지 효율 등급 평균",
              trend: [4.1, 3.9, 3.7, 3.5, 3.3, 3.2],
              lawData: "건물에너지 효율등급 인증에 관한 규칙"
            },
            { 
              name: "그린빌딩비율", 
              size: 25, 
              unit: "%", 
              value: 15,
              description: "친환경 인증 건물 비율",
              trend: [8, 10, 11, 13, 14, 15],
              lawData: "녹색건축물 조성 지원법"
            }
          ]
        },
        {
          name: "수송",
          color: "#4AB3FF",
          icon: "🚗",
          description: "친환경 교통 및 모빌리티 정책",
          target: 80,
          current: 65,
          children: [
            { 
              name: "전기차보급률", 
              size: 40, 
              unit: "%", 
              value: 8.5,
              description: "전체 차량 중 전기차 비율",
              trend: [1.2, 2.4, 3.8, 5.2, 6.8, 8.5],
              lawData: "환경친화적 자동차의 개발 및 보급 촉진에 관한 법률"
            },
            { 
              name: "대중교통분담률", 
              size: 30, 
              unit: "%", 
              value: 42,
              description: "전체 교통수단 중 대중교통 이용 비율",
              trend: [38, 39, 40, 40.5, 41, 42],
              lawData: "대중교통의 육성 및 이용촉진에 관한 법률"
            }
          ]
        },
        {
          name: "농·축산",
          color: "#50E3C2",
          icon: "🌱",
          description: "지속가능한 농업 및 축산업 정책",
          target: 70,
          current: 58,
          children: [
            { 
              name: "친환경농업면적", 
              size: 35, 
              unit: "%", 
              value: 12,
              description: "전체 농업면적 중 친환경 농업 비율",
              trend: [8, 9, 10, 10.5, 11, 12],
              lawData: "친환경농어업 육성 및 유기식품 등의 관리·지원에 관한 법률"
            },
            { 
              name: "탄소저감", 
              size: 25, 
              unit: "tCO2", 
              value: 850,
              description: "농업부문 온실가스 감축량",
              trend: [600, 650, 700, 750, 800, 850],
              lawData: "저탄소 녹색성장 기본법"
            }
          ]
        },
        {
          name: "폐기물",
          color: "#F2082F",
          icon: "♻️",
          description: "순환경제 기반 폐기물 관리 정책",
          target: 90,
          current: 77,
          children: [
            { 
              name: "재활용률", 
              size: 45, 
              unit: "%", 
              value: 68,
              description: "전체 폐기물 중 재활용된 비율",
              trend: [58, 61, 63, 65, 66, 68],
              lawData: "자원의 절약과 재활용촉진에 관한 법률"
            },
            { 
              name: "매립저감률", 
              size: 25, 
              unit: "%", 
              value: 82,
              description: "매립 폐기물 감축 비율",
              trend: [70, 74, 76, 78, 80, 82],
              lawData: "폐기물관리법"
            }
          ]
        },
        {
          name: "산업",
          color: "#4AB3FF",
          icon: "🏭",
          description: "산업부문 친환경 전환 정책",
          target: 75,
          current: 62,
          children: [
            { 
              name: "청정기술도입률", 
              size: 35, 
              unit: "%", 
              value: 45,
              description: "제조업체의 청정기술 도입 비율",
              trend: [28, 32, 36, 40, 42, 45],
              lawData: "청정생산지원법"
            },
            { 
              name: "에너지집약도", 
              size: 30, 
              unit: "toe/억원", 
              value: 0.24,
              description: "산업부문 에너지 집약도",
              trend: [0.32, 0.30, 0.28, 0.26, 0.25, 0.24],
              lawData: "에너지이용 합리화법"
            }
          ]
        },
        {
          name: "흡수원",
          color: "#50E3C2",
          icon: "🌲",
          description: "탄소 흡수원 확대 및 관리 정책",
          target: 85,
          current: 81,
          children: [
            { 
              name: "산림면적증가율", 
              size: 40, 
              unit: "%", 
              value: 2.1,
              description: "연간 산림면적 증가율",
              trend: [1.2, 1.4, 1.6, 1.8, 1.9, 2.1],
              lawData: "산림기본법"
            },
            { 
              name: "도시녹지율", 
              size: 25, 
              unit: "%", 
              value: 28,
              description: "도시 지역 녹지 비율",
              trend: [22, 23, 25, 26, 27, 28],
              lawData: "도시공원 및 녹지 등에 관한 법률"
            }
          ]
        }
      ]
    } as any;

    const width = 800, height = 800;
    const radius = Math.min(width, height) / 2 - 20;

    const svg = d3.select('#wheelSvg');
    const mainGroup = d3.select('#mainGroup');

    const root = d3.partition()
      .size([2 * Math.PI, radius])(
        d3.hierarchy(policyData)
          .sum((d: any) => d.size || 1)
          .sort((a: any, b: any) => b.value - a.value)
      );

    const arc = d3.arc()
      .startAngle((d: any) => d.x0)
      .endAngle((d: any) => d.x1)
      .innerRadius((d: any) => d.depth === 1 ? 80 : (d.depth === 2 ? 160 : 240))
      .outerRadius((d: any) => d.depth === 1 ? 150 : (d.depth === 2 ? 230 : 300));

    const ringRadii = [80, 150, 160, 230, 240, 300];
    ringRadii.forEach(r => {
      mainGroup.append('circle')
        .attr('r', r)
        .attr('class', 'ring-guide');
    });

    mainGroup.append('text')
      .attr('x', -85)
      .attr('y', 5)
      .attr('class', 'ring-label')
      .text('카테고리');

    mainGroup.append('text')
      .attr('x', -195)
      .attr('y', 5)
      .attr('class', 'ring-label')  
      .text('지표');

    mainGroup.append('text')
      .attr('x', -270)
      .attr('y', 5)
      .attr('class', 'ring-label')
      .text('Law Data');

    mainGroup.append('circle')
      .attr('r', 72)
      .attr('fill', 'url(#centerGradient)')
      .attr('stroke', 'rgba(255,255,255,0.05)')
      .attr('stroke-width', 1);

    mainGroup.append('text')
      .attr('y', -8)
      .attr('class', 'center-label')
      .text('정책지표');

    mainGroup.append('text')
      .attr('y', 8)
      .attr('class', 'center-label')
      .style('font-size', '12px')
      .style('opacity', '0.7')
      .text('Dashboard');

    const colorMap: Record<string, string> = {};
    (policyData.children as any[]).forEach(cat => {
      colorMap[cat.name] = cat.color;
    });

    const tooltip = d3.select('#d3Tooltip');

    function showTooltip(event: any, d: any) {
      let content = `<strong>${d.data.name}</strong>`;
      if (d.data.value) {
        content += `<br>현재값: ${d.data.value}${d.data.unit || ''}`;
      }
      if (d.data.description) {
        content += `<br><small>${d.data.description}</small>`;
      }
      tooltip.html(content)
        .classed('visible', true)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
    }

    function hideTooltip() {
      tooltip.classed('visible', false);
    }

    function rotateToCenter(p: any) {
      const angle = Math.PI / 2 - (p.x0 + p.x1) / 2;
      mainGroup.transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr('transform', `translate(400,400) rotate(${angle * 180 / Math.PI})`);
    }

    function renderTrendChart(data: number[], color = '#B9E300') {
      const trendChart = document.getElementById('trendChart');
      if (!trendChart) return;
      trendChart.innerHTML = '';
      const chartDiv = document.createElement('div');
      chartDiv.style.width = '100%';
      chartDiv.style.height = '100%';
      trendChart.appendChild(chartDiv);
      const chart = echarts.init(chartDiv);
      const option = {
        backgroundColor: 'transparent',
        grid: { left: 20, right: 20, top: 20, bottom: 30 },
        xAxis: {
          type: 'category',
          data: ['2019', '2020', '2021', '2022', '2023', '2024'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } }
        },
        series: [{
          type: 'line',
          smooth: true,
          data: data,
          name: '값',
          lineStyle: { width: 3, color: color },
          areaStyle: { opacity: 0.1, color: color },
          itemStyle: { color: color },
          symbol: 'circle',
          symbolSize: 6
        }],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(10,10,14,0.9)',
          borderColor: 'rgba(255,255,255,0.1)',
          textStyle: { color: '#fff', fontSize: 12 }
        }
      } as any;
      chart.setOption(option);
      const resizeHandler = () => chart.resize();
      window.addEventListener('resize', resizeHandler);
    }

    const segments = mainGroup.selectAll('.segment')
      .data(root.descendants().filter((d: any) => d.depth))
      .join('path')
      .attr('class', 'segment')
      .attr('fill', (d: any) => {
        if (d.depth === 1) {
          return colorMap[d.data.name] || '#4AB3FF';
        } else if (d.depth === 2) {
          const parentColor = colorMap[d.parent.data.name] || '#4AB3FF';
          return d3.color(parentColor).brighter(0.3);
        } else {
          const grandParentColor = colorMap[d.ancestors()[d.ancestors().length - 2].data.name] || '#4AB3FF';
          return d3.color(grandParentColor).brighter(0.6);
        }
      })
      .attr('opacity', (d: any) => d.depth === 1 ? 0.15 : (d.depth === 2 ? 0.12 : 0.08))
      .attr('d', arc as any)
      .on('click', (event: any, d: any) => {
        event.stopPropagation();
        rotateToCenter(d);
        showInfo(d);
      })
      .on('mouseover', function(this: SVGPathElement, event: any, d: any) {
        d3.select(this).attr('opacity', (d: any) => d.depth === 1 ? 0.25 : (d.depth === 2 ? 0.2 : 0.15));
        showTooltip(event, d);
      })
      .on('mouseout', function(this: SVGPathElement, event: any, d: any) {
        d3.select(this).attr('opacity', (d: any) => d.depth === 1 ? 0.15 : (d.depth === 2 ? 0.12 : 0.08));
        hideTooltip();
      });

    mainGroup.selectAll('.d3-label')
      .data(root.descendants().filter((d: any) => d.depth && (d.x1 - d.x0) > 0.15))
      .join('text')
      .attr('class', 'd3-label')
      .attr('transform', (d: any) => {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        const rotation = x - 90;
        return `rotate(${rotation}) translate(${y},0) rotate(${rotation > 90 ? 180 : 0})`;
      })
      .attr('dy', '0.35em')
      .style('font-size', (d: any) => {
        const baseSize = d.depth === 1 ? 12 : (d.depth === 2 ? 10 : 8);
        return baseSize + 'px';
      })
      .text((d: any) => d.data.name);

    const legendContent = d3.select('#legendContent');
    (policyData.children as any[]).forEach(category => {
      const swatch = legendContent.append('div')
        .attr('class', 'swatch');
      swatch.append('span')
        .attr('class', 'dot')
        .style('background', category.color);
      swatch.append('span')
        .text(category.name);
    });

    const sidePanel = document.getElementById('sidePanel') as HTMLElement;
    const panelTitle = document.getElementById('panelTitle') as HTMLElement;
    const panelMeta = document.getElementById('panelMeta') as HTMLElement;
    const panelSummary = document.getElementById('panelSummary') as HTMLElement;
    const panelLawValue = document.getElementById('panelLawValue') as HTMLElement;
    const panelLinks = document.getElementById('panelLinks') as HTMLElement;
    const panelIcon = document.getElementById('panelIcon') as HTMLElement;
    const panelCurrentValue = document.getElementById('panelCurrentValue') as HTMLElement;
    const progressFill = document.getElementById('progressFill') as HTMLElement;

    function showInfo(d: any) {
      const data = d.data;
      if (d.depth === 1) {
        panelIcon.textContent = data.icon || '📊';
        (panelIcon as any).style.background = data.color;
        panelTitle.textContent = data.name + ' 카테고리';
        panelMeta.textContent = `${data.name} · 종합 지표 · 현재: ${data.current}%`;
        panelSummary.textContent = data.description;
        panelCurrentValue.textContent = data.current + '%';
        const progress = (data.current / data.target) * 100;
        progressFill.style.width = Math.min(progress, 100) + '%';
        panelLawValue.textContent = `${data.current}% (목표: ${data.target}%)`;
        panelLinks.innerHTML = `
          <li><a href="#" onclick="return false;">${data.name} 정책 종합보고서</a></li>
          <li><a href="#" onclick="return false;">관련 법령 및 규정</a></li>
          <li><a href="#" onclick="return false;">국제 비교 데이터</a></li>
        `;
        const categoryTrend = [data.current - 15, data.current - 12, data.current - 8, data.current - 5, data.current - 2, data.current];
        renderTrendChart(categoryTrend, data.color);
      } else if (d.depth === 2) {
        const parentData = d.parent.data;
        panelIcon.textContent = parentData.icon || '📊';
        (panelIcon as any).style.background = parentData.color;
        panelTitle.textContent = data.name;
        panelMeta.textContent = `${parentData.name} · ${data.unit} · 현재: ${data.value}${data.unit}`;
        panelSummary.textContent = data.description;
        panelCurrentValue.textContent = data.value + data.unit;
        const targetValue = data.unit === '%' ? 90 : (data.unit === '등급' ? 1 : data.value * 1.3);
        const progress = data.unit === '등급' ? (5 - data.value) / 4 * 100 : (data.value / targetValue) * 100;
        progressFill.style.width = Math.min(Math.max(progress, 0), 100) + '%';
        panelLawValue.textContent = `${data.value}${data.unit} (관련법: ${data.lawData})`;
        panelLinks.innerHTML = `
          <li><a href="#" onclick="return false;">${data.name} 상세 데이터</a></li>
          <li><a href="#" onclick="return false;">측정 방법론</a></li>
          <li><a href="#" onclick="return false;">관련 정책 문서</a></li>
        `;
        renderTrendChart(data.trend, parentData.color);
      }
      sidePanel.classList.add('open');
      sidePanel.setAttribute('aria-hidden', 'false');
    }

    function closePanel() {
      sidePanel.classList.remove('open');
      sidePanel.setAttribute('aria-hidden', 'true');
    }

    const panelClose = document.getElementById('panelClose');
    panelClose?.addEventListener('click', closePanel);

    const resetBtn = document.getElementById('resetBtn');
    resetBtn?.addEventListener('click', () => {
      mainGroup.transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr('transform', 'translate(400,400)');
      closePanel();
      hideTooltip();
    });

    const helpBtn = document.getElementById('helpBtn');
    helpBtn?.addEventListener('click', () => {
      alert(`정책지표 대시보드 사용법:\n\n🎯 3중 휠 구조:\n• 내측: 7개 정책 카테고리\n• 중간: 각 카테고리별 핵심 지표  \n• 외측: 법령 및 정책 데이터\n\n✨ 상호작용:\n• 세그먼트 클릭: 해당 항목으로 회전 및 정보 표시\n• 호버: 툴팁으로 간단 정보 미리보기\n• Reset View: 초기 상태로 복원\n• ESC 키: 패널 닫기\n\n📊 우측 패널:\n• 현재값 및 목표 대비 진행률\n• 6년간 추세 차트\n• 관련 법령 정보\n• 상세 리소스 링크`);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePanel();
        hideTooltip();
        mainGroup.transition()
          .duration(500)
          .attr('transform', 'translate(400,400)');
      }
    });

    svg.on('click', (event: any) => {
      if (event.target === svg.node()) {
        mainGroup.transition()
          .duration(1000)
          .ease(d3.easeCubicInOut)
          .attr('transform', 'translate(400,400)');
        closePanel();
        hideTooltip();
      }
    });

    svg.on('mouseleave', hideTooltip);

    function handleResize() {
      const container = document.querySelector('.wheel-wrap') as HTMLElement;
      if (!container) return;
      const containerWidth = container.offsetWidth;
      const newSize = Math.min(containerWidth - 44, 720);
      svg.attr('width', newSize).attr('height', newSize);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    setTimeout(() => {
      (segments as any).style('opacity', 0)
        .transition()
        .duration(800)
        .delay((d: any, i: number) => i * 50)
        .ease(d3.easeCircleOut)
        .style('opacity', (d: any) => d.depth === 1 ? 0.15 : (d.depth === 2 ? 0.12 : 0.08));
    }, 300);
  }, [scriptsLoaded]);

  return (
    <div className="app" role="application">
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js" strategy="afterInteractive" onLoad={() => setScriptsLoaded(s => ({ ...s, d3: true }))} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js" strategy="afterInteractive" onLoad={() => setScriptsLoaded(s => ({ ...s, echarts: true }))} />

      <style>{`
:root{
  --bg: #151329;
  --palette-1: #B9E300;
  --palette-2: #FF6B3D;
  --palette-3: #4AB3FF;
  --palette-4: #50E3C2;
  --palette-5: #F2082F;
  --muted: rgba(255,255,255,0.06);
  --glass: rgba(255,255,255,0.04);
  --text: #F4F5F7;
  --accent-foreground: #0D0B12;
  --panel-width: 420px;
  --gutter: 24px;
  font-family: Inter, "Noto Sans KR", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
html,body{height:100%;}
body{
  margin:0;
  background:linear-gradient(180deg,var(--bg), #0f0d1a 120%);
  color:var(--text);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  overflow:hidden;
}
.app{
  display:flex;
  height:100vh;
  gap:var(--gutter);
  padding:28px;
  box-sizing:border-box;
}
.dashboard{
  flex:1 1 auto;
  min-width:0;
  display:flex;
  flex-direction:column;
  gap:18px;
}
.header{display:flex;align-items:center;justify-content:space-between;gap:12px;}
.title{display:flex;gap:12px;align-items:center;}
.brand-dot{width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,var(--palette-1),var(--palette-3));box-shadow:0 6px 18px rgba(0,0,0,0.5);} 
h1{font-size:18px;margin:0;font-weight:600;}
.subtitle{opacity:0.7;font-size:13px}
.controls{display:flex;gap:10px;align-items:center}
.control-btn{background:var(--glass);border:1px solid rgba(255,255,255,0.03);padding:8px 12px;border-radius:8px;color:var(--text);cursor:pointer;transition:all 0.2s ease;}
.control-btn:hover{background:rgba(255,255,255,0.08);} 
.wheel-wrap{background:linear-gradient(180deg, rgba(255,255,255,0.02), transparent);border-radius:14px;padding:22px;flex:1;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,0.03);} 
.wheel-svg{width:min(720px,100%);height:min(720px,72vh);} 
.legend{position:absolute;left:24px;bottom:24px;background:rgba(0,0,0,0.25);padding:16px;border-radius:12px;font-size:13px;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.05);} 
.segment{cursor:pointer;transition:all 0.3s ease;stroke:rgba(255,255,255,0.1);stroke-width:1;}
.segment:hover{filter:brightness(1.2);stroke:rgba(255,255,255,0.3);stroke-width:2;}
.d3-label{font-size:11px;fill:var(--text);text-anchor:middle;font-weight:500;text-shadow:1px 1px 2px rgba(0,0,0,0.8);pointer-events:none;}
.center-label{font-size:16px;font-weight:700;fill:var(--text);text-anchor:middle;pointer-events:none;}
.ring-guide{fill:none;stroke:rgba(255,255,255,0.02);stroke-width:1;}
.ring-label{font-size:10px;opacity:0.6;font-weight:500;fill:var(--text);} 
.side-panel{width:var(--panel-width);max-width:100%;background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));border-left:1px solid rgba(255,255,255,0.04);box-shadow:-30px 0 60px rgba(0,0,0,0.5);border-radius:12px;padding:18px;box-sizing:border-box;transform:translateX(100%);transition:transform 420ms cubic-bezier(.2,.9,.3,1);position:relative;overflow:auto;}
.side-panel.open{transform:translateX(0%)}
.panel-close{position:absolute;left:-38px;top:12px;background:var(--glass);border-radius:10px;padding:8px;cursor:pointer;border:1px solid rgba(255,255,255,0.04);transition:all 0.2s ease;}
.panel-close:hover{background:rgba(255,255,255,0.08);} 
.panel-header{display:flex;align-items:center;gap:12px}
.panel-icon{width:44px;height:44px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;}
.panel-title{font-weight:700;font-size:16px;}
.panel-meta{font-size:13px;opacity:0.8;margin-top:2px;}
.chart-box{height:220px;margin-top:12px;border-radius:8px;background:linear-gradient(180deg, rgba(255,255,255,0.01), transparent);display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.02)}
.panel-section{margin-top:20px}
.section-title{opacity:0.75;font-size:13px;font-weight:600;margin-bottom:8px;color:var(--palette-3);} 
.panel-value{font-size:24px;font-weight:700;margin-top:8px;}
.progress-bar{width:100%;height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden;margin-top:8px;}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--palette-1),var(--palette-3));border-radius:3px;transition:width 0.6s ease;}
@media (max-width:1100px){
  .app{padding:14px;flex-direction:column;}
  .wheel-svg{width:100%;height:50vh;}
  .side-panel{position:fixed;right:14px;top:14px;bottom:14px;width:90%;max-width:420px;z-index:100;}
  .panel-close{left:12px;top:12px;}
}
.swatch{display:inline-flex;gap:8px;align-items:center;margin-bottom:8px;}
.swatch .dot{width:14px;height:14px;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,0.2);} 
.panel-links{list-style:none;padding:0;margin:8px 0 0 0;}
.panel-links li{margin-bottom:8px;}
.panel-links a{color:var(--palette-3);text-decoration:none;font-size:14px;transition:opacity 0.2s ease;}
.panel-links a:hover{opacity:0.8;}
.d3-tooltip{position:absolute;background:rgba(10,10,14,0.9);padding:8px 12px;border-radius:8px;font-size:12px;border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(8px);z-index:1000;pointer-events:none;opacity:0;transition:opacity 0.2s ease;}
.d3-tooltip.visible{opacity:1;}
@keyframes fadeIn {from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); }}
.panel-section {animation: slideInRight 0.4s ease-out forwards;animation-delay: calc(var(--index, 0) * 0.1s);} 
@keyframes slideInRight {from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); }}
      `}</style>

      <main className="dashboard" role="main">
        <div className="header">
          <div className="title">
            <div className="brand-dot" aria-hidden></div>
            <div>
              <h1>정책지표 대시보드</h1>
              <div className="subtitle">3중 휠 — 카테고리 · 지표 · 수치(Law Data)</div>
            </div>
          </div>
          <div className="controls">
            <button className="control-btn" id="resetBtn">Reset View</button>
            <button className="control-btn" id="helpBtn">Guide</button>
          </div>
        </div>

        <section className="wheel-wrap" aria-label="Policy Wheel">
          <svg className="wheel-svg" id="wheelSvg" viewBox="0 0 800 800" role="img" aria-labelledby="wheelTitle" preserveAspectRatio="xMidYMid meet">
            <title id="wheelTitle">정책지표 3중 휠</title>
            <defs>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="12" stdDeviation="18" floodOpacity="0.25" />
              </filter>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.05)' }} />
                <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0.01)' }} />
              </radialGradient>
            </defs>
            <g id="mainGroup" transform="translate(400,400)">
              {/* D3가 링과 세그먼트를 추가합니다 */}
            </g>
          </svg>

          <div className="legend" aria-hidden>
            <div style={{ fontWeight: 700, marginBottom: 12, color: 'var(--palette-3)' }}>카테고리</div>
            <div id="legendContent"></div>
          </div>

          <div className="d3-tooltip" id="d3Tooltip"></div>
        </section>
      </main>

      <aside className="side-panel" id="sidePanel" aria-hidden="true">
        <button className="panel-close" id="panelClose" aria-label="Close panel">✕</button>
        <div className="panel-header">
          <div className="panel-icon" id="panelIcon" style={{ background: 'var(--palette-3)' }}>📊</div>
          <div>
            <div className="panel-title" id="panelTitle">지표명</div>
            <div className="panel-meta" id="panelMeta">카테고리 · 단위 · 최신값</div>
          </div>
        </div>

        <div className="panel-section" style={{ ['--index' as any]: 0 }}>
          <div className="section-title">현재 값</div>
          <div className="panel-value" id="panelCurrentValue">72%</div>
          <div className="progress-bar">
            <div className="progress-fill" id="progressFill" style={{ width: '72%' }}></div>
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>목표: 90%</div>
        </div>

        <div className="panel-section" style={{ ['--index' as any]: 1 }}>
          <div className="section-title">요약</div>
          <div id="panelSummary" style={{ marginTop: 8, lineHeight: 1.5 as any }}>선택한 지표에 대한 간단한 설명이 들어갑니다.</div>
        </div>

        <div className="panel-section" style={{ ['--index' as any]: 2 }}>
          <div className="section-title">추세 (최근 6년)</div>
          <div className="chart-box" id="trendChart">Trend Chart</div>
        </div>

        <div className="panel-section" style={{ ['--index' as any]: 3 }}>
          <div className="section-title">Law Data (최근값)</div>
          <div style={{ marginTop: 8, fontSize: 14, fontWeight: 700 }} id="panelLawValue">—</div>
        </div>

        <div className="panel-section" style={{ ['--index' as any]: 4 }}>
          <div className="section-title">관련 리소스</div>
          <ul className="panel-links" id="panelLinks">
            <li><a href="#" onClick={(e) => e.preventDefault()}>관련 문서 1</a></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}


