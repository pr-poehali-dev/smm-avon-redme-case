import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            let start = 0;
            const end = value;
            const duration = 1500;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);

            return () => clearInterval(timer);
          }
        },
        { threshold: 0.5 }
      );

      if (counterRef.current) observer.observe(counterRef.current);
      return () => observer.disconnect();
    }, [value, isVisible]);

    return (
      <span ref={counterRef} className="animate-counter-up">
        {count}{suffix}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary">
      <div className="max-w-[1080px] mx-auto px-4 py-16 space-y-24">
        
        {/* Card 1: Cover */}
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          className={`transition-all duration-700 ${
            visibleCards.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="p-12 bg-gradient-to-br from-white to-secondary/50 border-0 shadow-2xl rounded-3xl overflow-hidden relative">
            <Badge className="mb-6 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold tracking-wide">
              SMM CASE
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
              Как тесты креативов помогли Avon и RedMe оценить актуальность социального проекта против абьюзивных отношений
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Кейс тестирования креативов для социального проекта
            </p>

            <div className="flex items-center gap-4 opacity-80">
              <span className="text-lg font-semibold">Avon</span>
              <span className="w-2 h-2 rounded-full bg-foreground/30"></span>
              <span className="text-lg font-semibold">RedMe</span>
            </div>

            <div className="absolute right-8 bottom-8 opacity-10">
              <Icon name="TrendingUp" size={200} />
            </div>
          </Card>
        </div>

        {/* Card 2: Participants */}
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          className={`transition-all duration-700 delay-100 ${
            visibleCards.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold mb-8">Кто участники проекта</h2>
          
          <Card className="p-10 bg-secondary/80 border-0 rounded-3xl backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8 divide-x divide-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Avon</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Производитель средств для ухода за кожей, парфюмерии и декоративной косметики
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:pl-8">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Target" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">RedMe</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Агентство социально ориентированного маркетинга
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Card 3: Task & Period */}
        <div
          ref={(el) => (cardRefs.current[2] = el)}
          className={`transition-all duration-700 delay-200 ${
            visibleCards.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-4xl font-bold mb-6">Задача</h2>
              <Card className="p-8 bg-white border-0 rounded-3xl shadow-lg h-full">
                <p className="text-lg leading-relaxed text-foreground">
                  Во время пандемии обострилась проблема домашнего насилия. Команда Avon решила рассказать женщинам о признаках абьюза, научить распознавать его на ранних стадиях отношений и реагировать на его проявления.
                </p>
              </Card>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">Период</h2>
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 rounded-3xl h-full flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Calendar" size={48} className="mx-auto mb-4 text-primary" />
                  <p className="text-2xl font-semibold">25 ноября — 10 декабря</p>
                  <p className="text-lg text-muted-foreground mt-2">2021 года</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Card 4: Project Details */}
        <div
          ref={(el) => (cardRefs.current[3] = el)}
          className={`transition-all duration-700 delay-300 ${
            visibleCards.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold mb-8">О спецпроекте</h2>
          
          <Card className="p-10 bg-white border-0 rounded-3xl shadow-lg">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <Badge className="mb-3 bg-secondary text-secondary-foreground">Лендинг</Badge>
                  <p className="text-lg leading-relaxed">
                    Avon c RedMe и психологами разработали лендинг «Азбука Абьюза» с информацией, рекомендациями и тестами
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <Badge className="mb-3 bg-secondary text-secondary-foreground">Видеоконтент</Badge>
                  <p className="text-lg leading-relaxed">
                    Для сайта и социальных сетей создали видеоролики про скрытые формы насилия «Перевод с абьюзерского»
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Card 5: Solution & Metrics */}
        <div
          ref={(el) => (cardRefs.current[4] = el)}
          className={`transition-all duration-700 delay-400 ${
            visibleCards.includes(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold mb-8">Решение</h2>
          
          <Card className="p-10 bg-white border-0 rounded-3xl shadow-lg mb-8">
            <p className="text-lg leading-relaxed mb-8">
              После запуска все видеоролики дополнительно протестировали на специализированной платформе. Это помогло убедиться в актуальности социальных проектов, усилить будущие креативы и найти новые точки соприкосновения с аудиторией.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-2xl text-center">
                <div className="text-5xl font-bold text-primary mb-3">
                  ~<AnimatedCounter value={40} suffix="%" />
                </div>
                <p className="text-foreground font-medium">задумались о своих отношениях</p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-2xl text-center">
                <div className="text-5xl font-bold text-accent mb-3">
                  <AnimatedCounter value={15} suffix="%" />
                </div>
                <p className="text-foreground font-medium">делились кейсом</p>
              </Card>
            </div>

            <p className="text-sm text-muted-foreground mt-6 opacity-70">
              * По данным специализированной платформы
            </p>
          </Card>
        </div>

        {/* Card 6: Results */}
        <div
          ref={(el) => (cardRefs.current[5] = el)}
          className={`transition-all duration-700 delay-500 ${
            visibleCards.includes(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold mb-8">Результаты</h2>
          
          <Card className="p-10 bg-gradient-to-br from-primary via-primary/90 to-accent text-white border-0 rounded-3xl shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <Icon name="CheckCircle2" size={28} className="flex-shrink-0 mt-1" />
                <p className="text-lg font-medium">Avon вышел на новый уровень доверия с потребителями</p>
              </div>

              <div className="flex items-start gap-4">
                <Icon name="CheckCircle2" size={28} className="flex-shrink-0 mt-1" />
                <p className="text-lg font-medium">Увеличил интерес к бренду</p>
              </div>

              <div className="flex items-start gap-4">
                <Icon name="CheckCircle2" size={28} className="flex-shrink-0 mt-1" />
                <p className="text-lg font-medium">RedMe был номинирован на премию Socvideo Awards</p>
              </div>

              <div className="flex items-start gap-4">
                <Icon name="CheckCircle2" size={28} className="flex-shrink-0 mt-1" />
                <p className="text-lg font-medium">Увеличил охват в социальных сетях</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20">
              <p className="text-lg opacity-90">
                Рост вовлечения и органических шеров, усиление лояльности и репутации
              </p>
            </div>
          </Card>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-4">Хотите такой же разбор?</p>
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:scale-105 transition-transform shadow-lg">
              Напишите нам
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Index;
