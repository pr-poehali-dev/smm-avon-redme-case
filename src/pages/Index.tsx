import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>('A');

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
    <div className="min-h-screen bg-gradient-to-b from-secondary via-background to-secondary flex items-center justify-center py-8">
      <div className="w-[1080px] space-y-8">
        
        {/* Card 1: Cover */}
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          className={`transition-all duration-700 ${
            visibleCards.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="p-16 bg-gradient-to-b from-white to-secondary/50 border-0 shadow-2xl rounded-3xl overflow-hidden relative h-[1296px]">
            <Badge className="mb-8 bg-primary text-primary-foreground px-5 py-2 text-base font-semibold tracking-wide">
              SMM CASE
            </Badge>
            
            <h1 className="text-5xl font-bold leading-tight mb-8 max-w-3xl">
              Как тесты креативов помогли Avon и RedMe оценить актуальность социального проекта против абьюзивных отношений
            </h1>
            
            <p className="text-xl text-muted-foreground mb-16">
              Кейс тестирования креативов для социального проекта
            </p>

            <div className="absolute bottom-16 left-16 right-16">
              <div className="flex gap-6 mb-8" style={{ transform: 'skewY(-3deg)' }}>
                <div className="flex-1 bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-6 transform hover:scale-105 transition-transform">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                    <Icon name="Play" size={56} className="text-primary z-10" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2/3 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <Icon name="Heart" size={20} className="text-accent" />
                      <span className="font-semibold text-lg">42%</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Icon name="Share2" size={20} className="text-primary" />
                      <span className="font-semibold text-lg">18%</span>
                    </div>
                  </div>
                  <Badge className="text-sm mt-3 bg-primary/10 text-primary px-3 py-1">Вариант A</Badge>
                </div>

                <div className="flex-1 bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-6 transform hover:scale-105 transition-transform">
                  <div className="aspect-[3/4] bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                    <Icon name="Play" size={56} className="text-accent z-10" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-1/2 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <Icon name="Heart" size={20} className="text-accent" />
                      <span className="font-semibold text-lg">38%</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Icon name="Share2" size={20} className="text-primary" />
                      <span className="font-semibold text-lg">12%</span>
                    </div>
                  </div>
                  <Badge className="text-sm mt-3 bg-accent/10 text-accent px-3 py-1">Вариант B</Badge>
                </div>
              </div>

              <div className="flex items-center gap-4 opacity-80">
                <span className="text-xl font-semibold">Avon</span>
                <span className="w-2 h-2 rounded-full bg-foreground/30"></span>
                <span className="text-xl font-semibold">RedMe</span>
              </div>
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
          <Card className="p-16 bg-secondary/80 border-0 rounded-3xl backdrop-blur-sm h-[1296px] flex flex-col">
            <h2 className="text-5xl font-bold mb-12">Кто участники проекта</h2>
            
            <div className="flex-1 flex flex-col gap-12">
              <div className="flex items-start gap-6 bg-white/50 p-8 rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-3xl mb-4">Avon</h3>
                  <p className="text-muted-foreground leading-relaxed text-xl">
                    Производитель средств для ухода за кожей, парфюмерии и декоративной косметики
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-white/50 p-8 rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Target" size={32} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-3xl mb-4">RedMe</h3>
                  <p className="text-muted-foreground leading-relaxed text-xl">
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
          <Card className="p-16 bg-[#EFF2F8] border-0 rounded-3xl shadow-lg h-[1296px] flex gap-12">
            {/* Left side: Text content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-5xl font-bold mb-8">Задача</h2>
                <p className="text-xl leading-relaxed text-foreground">
                  Во время пандемии обострилась проблема домашнего насилия. Команда Avon решила рассказать женщинам о признаках абьюза, научить распознавать его на ранних стадиях отношений и реагировать на его проявления.
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-bold mb-8">Период</h2>
                <p className="text-xl leading-relaxed text-foreground">
                  С 25 ноября по 10 декабря 2021 года.
                </p>
              </div>
            </div>

            {/* Right side: Chat interface illustration */}
            <div className="flex-1 flex items-center justify-center">
              <div 
                className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md"
                style={{ transform: 'rotate(5deg)' }}
              >
                <div className="space-y-6">
                  {/* Message 1 */}
                  <div className="bg-gray-100 rounded-xl p-4">
                    <p className="text-sm text-gray-800 mb-2">
                      Ты всегда такая глупая, никогда ничего не понимаешь
                    </p>
                    <span className="inline-block bg-[#FF5C7A] text-white text-xs px-3 py-1 rounded-full">
                      Оскорбления
                    </span>
                  </div>

                  {/* Message 2 */}
                  <div className="bg-gray-100 rounded-xl p-4">
                    <p className="text-sm text-gray-800 mb-2">
                      Почему ты не ответила сразу? С кем ты там?
                    </p>
                    <span className="inline-block bg-[#FF5C7A] text-white text-xs px-3 py-1 rounded-full">
                      Контроль
                    </span>
                  </div>

                  {/* Message 3 */}
                  <div className="bg-gray-100 rounded-xl p-4">
                    <p className="text-sm text-gray-800 mb-2">
                      Никто тебя не полюбит так, как я
                    </p>
                    <span className="inline-block bg-[#FF5C7A] text-white text-xs px-3 py-1 rounded-full">
                      Манипуляция
                    </span>
                  </div>

                  {/* Message 4 */}
                  <div className="bg-gray-100 rounded-xl p-4">
                    <p className="text-sm text-gray-800 mb-2">
                      Это всё из-за тебя, ты меня довела
                    </p>
                    <span className="inline-block bg-[#FF5C7A] text-white text-xs px-3 py-1 rounded-full">
                      Обвинения
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Card 4: Project Details */}
        <div
          ref={(el) => (cardRefs.current[3] = el)}
          className={`transition-all duration-700 delay-300 ${
            visibleCards.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="p-16 bg-white border-0 rounded-3xl shadow-lg h-[1296px]">
            <h2 className="text-5xl font-bold mb-12">О спецпроекте</h2>
            
            <div className="flex gap-12 h-[calc(100%-6rem)]">
              {/* Left side: Info cards */}
              <div className="flex-1 space-y-8">
                <div className="p-8 bg-white border-2 border-[#E6EAF1] rounded-2xl">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Лендинг</p>
                  <p className="text-xl leading-relaxed text-foreground">
                    Avon c RedMe и психологами разработали лендинг «Азбука Абьюза» с информацией, рекомендациями и тестами.
                  </p>
                </div>

                <div className="p-8 bg-white border-2 border-[#E6EAF1] rounded-2xl">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Видеоконтент</p>
                  <p className="text-xl leading-relaxed text-foreground">
                    Для сайта и социальных сетей создали видеоролики про скрытые формы насилия «Перевод с абьюзерского».
                  </p>
                </div>
              </div>

              {/* Right side: Landing mockup */}
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border-2 border-[#E6EAF1]">
                  {/* Header */}
                  <div className="bg-[#EFF2F8] rounded-xl p-4 mb-6">
                    <h3 className="text-2xl font-bold text-center">Азбука Абьюза</h3>
                  </div>

                  {/* Test cards */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-[#F8F9FB] rounded-xl p-5 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-[#5B6CFF] text-white rounded-full flex items-center justify-center font-bold text-sm">
                          A
                        </div>
                        <p className="font-semibold">Тест на абьюз</p>
                      </div>
                      <div className="space-y-2 ml-11">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="w-4 h-4" checked readOnly />
                          <span>Контроль действий</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="w-4 h-4" />
                          <span>Изоляция от близких</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-[#F8F9FB] rounded-xl p-5 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-[#5B6CFF] text-white rounded-full flex items-center justify-center font-bold text-sm">
                          B
                        </div>
                        <p className="font-semibold">Признаки насилия</p>
                      </div>
                      <div className="space-y-2 ml-11">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="w-4 h-4" />
                          <span>Угрозы и шантаж</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="w-4 h-4" checked readOnly />
                          <span>Эмоциональное давление</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-[#5B6CFF] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#4a5bd4] transition-colors">
                    Пройти тест
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Card 5: A/B Testing */}
        <div
          ref={(el) => (cardRefs.current[4] = el)}
          className={`transition-all duration-700 delay-400 ${
            visibleCards.includes(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="p-16 bg-white border-0 rounded-3xl shadow-lg h-[1296px]">
            <h2 className="text-5xl font-bold mb-12">A/B тестирование креативов</h2>
              
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveVariant('A')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                    activeVariant === 'A'
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Вариант A
                </button>
                <button
                  onClick={() => setActiveVariant('B')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                    activeVariant === 'B'
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Вариант B
                </button>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/50 to-muted/50 p-8">
                <div
                  className={`transition-all duration-500 ${
                    activeVariant === 'A' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'
                  }`}
                >
                  <div className="aspect-video bg-white rounded-xl shadow-lg flex items-center justify-center p-6">
                    <div className="text-center">
                      <Icon name="Play" size={64} className="mx-auto mb-4 text-primary" />
                      <h4 className="text-2xl font-bold mb-2">«Это не любовь»</h4>
                      <p className="text-muted-foreground">Эмоциональный подход</p>
                      <div className="mt-6 flex justify-center gap-8">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">42%</div>
                          <div className="text-sm text-muted-foreground">вовлечение</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-accent">18%</div>
                          <div className="text-sm text-muted-foreground">шеры</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`transition-all duration-500 ${
                    activeVariant === 'B' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 absolute'
                  }`}
                >
                  <div className="aspect-video bg-white rounded-xl shadow-lg flex items-center justify-center p-6">
                    <div className="text-center">
                      <Icon name="Play" size={64} className="mx-auto mb-4 text-accent" />
                      <h4 className="text-2xl font-bold mb-2">«Признаки абьюза»</h4>
                      <p className="text-muted-foreground">Образовательный подход</p>
                      <div className="mt-6 flex justify-center gap-8">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">38%</div>
                          <div className="text-sm text-muted-foreground">вовлечение</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-accent">12%</div>
                          <div className="text-sm text-muted-foreground">шеры</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </Card>
        </div>

        {/* Card 6: Solution & Metrics */}
        <div
          ref={(el) => (cardRefs.current[5] = el)}
          className={`transition-all duration-700 delay-500 ${
            visibleCards.includes(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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