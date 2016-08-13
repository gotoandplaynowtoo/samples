package exp4;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.geom.Ellipse2D;
import java.util.ArrayList;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Main extends JFrame
{
	public static final int _WIDTH = 500;
	public static final int _HEIGHT = 500;

	public Main()
	{
		setTitle("Circular Motion");
		setSize(_WIDTH, _HEIGHT);
		setResizable(false);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setVisible(true);
	}

	public static void main(String[] args)
	{
		Main m = new Main();

		MainPanel.panelWidth = Main._WIDTH - (m.getInsets().left+m.getInsets().right);
		MainPanel.panelHeight = Main._HEIGHT - (m.getInsets().top+m.getInsets().bottom);

		m.add(new MainPanel());

	}
}

class MainPanel extends JPanel implements Runnable
{

	public static int panelWidth;
	public static int panelHeight;
	public Color bgColor;
	public Color textColor;

	public HallowBall hBall;
	public ArrayList<Ball> balls;
	public int centerX;
	public int centerY;
	public int numOfItems;

	private class MainPanelMouseListener extends MouseAdapter {
		@Override
		public void mouseClicked(MouseEvent e) {
			Ball ball = new Ball();
			initBall(ball);
			balls.add(ball);
			numOfItems = balls.size();
		}
	}

	public MainPanel()
	{
		bgColor = new Color(0xffffff);
		textColor = new Color(0x000000);
		centerX = panelWidth / 2;
		centerY = panelHeight / 2;

		hBall = new HallowBall();
		hBall.x = centerX;
		hBall.y = centerY;

		balls = new ArrayList<Ball>();

		addMouseListener(new MainPanelMouseListener());

		Thread t = new Thread(this);
		t.start();

	}

	public void initBall(Ball ball)
	{
		ball.x = centerX;
		ball.y = centerY;
	}

	@Override
	public void paint(Graphics g)
	{
		super.paint(g);
		g.setColor(bgColor);
		g.fillRect(0,0, panelWidth, panelHeight);
		g.setColor(textColor);
		g.drawString("No. of items: "+numOfItems, 5, 15);

		hBall.paintBall(g);

		for(int i = 0; i < balls.size(); i++)
		{
			balls.get(i).paintBall(g);
		}
	}

	@Override
	public void run()
	{
		while(true)
		{
			try {
				Thread.sleep(33);
				updateBalls();
				repaint();
			}catch(Exception e) {
				e.printStackTrace();
			}


		}
	}

	public void updateBalls() {

		for(int i = 0; i < balls.size(); i++)
		{

			balls.get(i).angle -= 3;
			balls.get(i).angle %= 360;
			balls.get(i).x = centerX + Math.cos(Math.PI / 180 * balls.get(i).angle) * (hBall.width / 2);
			balls.get(i).y = centerY + Math.sin(Math.PI / 180 * balls.get(i).angle) * (hBall.height / 2);
		}
	}

}

class Ball
{
	public double x;
	public double y;
	public int width;
	public int height;
	public int radius;
	public Color color;
	public Ellipse2D.Double ball;
	public int angle;

	public Ball() {
		x = 0;
		y = 0;
		angle = 0;
		radius = 15;
		width = height = radius * 2;
		color = new Color(0xcccccc);
		ball = new Ellipse2D.Double();
	}

	public void paintBall(Graphics g) {
		Graphics2D g2 = (Graphics2D)g;
		g2.setPaint(color);

		ball.setFrame(x-getOffSetX(), y-getOffSetY(), width, height);
		g2.fill(ball);
	}


	public double getOffSetX()
	{
		return width / 2;
	}

	public double getOffSetY()
	{
		return height / 2;
	}

}

class HallowBall extends Ball {
	public HallowBall() {
		x = 0;
		y = 0;
		angle = 0;
		radius = 150;
		width = height = radius * 2;
		color = new Color(0xcccccc);
		ball = new Ellipse2D.Double();
	}

	@Override
	public void paintBall(Graphics g){
		Graphics2D g2 = (Graphics2D)g;
		g2.setPaint(color);
		ball.setFrame(x-getOffSetX(), y-getOffSetY(), width, height);
		g2.draw(ball);
	}
}