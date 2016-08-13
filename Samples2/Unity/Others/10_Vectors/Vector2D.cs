
using UnityEngine;

/// <summary>
/// Representation of 2D Vector
/// </summary>
public struct Vector2D
{

    #region Static variables
    public static Vector2D one
    {
        get
        {
            return new Vector2D(1f, 1f);
        }
    }

    public static Vector2D zero
    {
        get
        {
            return new Vector2D(0, 0);
        }
    }

    public static Vector2D right
    {
        get
        {
            return new Vector2D(1f, 0);
        }
    }

    public static Vector2D up
    {
        get
        {
            return new Vector2D(0f, 1f);
        }
    }
    #endregion

    #region Variables

    public float x;
    public float y;

    public Vector2D normalize
    {
        get
        {
            //return new Vector2D(this.x / this.magnitude, this.y / this.magnitude);
            Vector2D result = new Vector2D(this.x, this.y);
            result.Normalize();
            return result;
        }
    }

    public float magnitude
    {
        get
        {
            return Mathf.Sqrt((this.x * this.x) + (this.y * this.y));
        }
    }

    public float sqrMagnitude
    {
        get
        {
            return (this.x * this.x) + (this.y * this.y);
        }
    }


    public float angle
    {
        get
        {
            return Mathf.Atan2(this.y, this.x);
        }
    }

    public float angleDegrees
    {
        get
        {
            return (Mathf.Atan2(this.y, this.x) * Mathf.Rad2Deg + 360) % 360;
        }
    }

    #endregion

    #region Constructor
    public Vector2D(float x, float y)
    {
        this.x = x;
        this.y = y;
    }

    #endregion

    #region Public Methods

    public void Normalize()
    {

        float magnitude = this.magnitude;
        if(magnitude > 1E-05f)
        {
            this /= magnitude;
        }
        else
        {
            this = Vector2D.zero;
        }


    }

    public void Set(float x, float y)
    {
        this.x = x;
        this.y = y;
    }

    #endregion


    #region Static Methods
    public static float Distance(Vector2D a, Vector2D b)
    {
        return (a - b).magnitude;
    }

    public static float Dot(Vector2D lhs, Vector2D rhs)
    {
        return lhs.x * rhs.x + lhs.y * rhs.y;
    }

    public static float Angle(Vector2D from, Vector2D to)
    {
        return Mathf.Acos(Vector2D.Dot(from.normalize, to.normalize));
    }
    #endregion

    #region Operators
    public static Vector2D operator +(Vector2D a, Vector2D b)
    {
        return new Vector2D(a.x + b.x, a.y + b.y);
    }

    public static Vector2D operator -(Vector2D a, Vector2D b)
    {
        return new Vector2D(a.x - b.x, a.y - b.y);
    }

    public static Vector2D operator -(Vector2D a)
    {
        return new Vector2D(-a.x, -a.y);
    }

    public static Vector2D operator /(Vector2D a, float d)
    {
        return new Vector2D(a.x / d, a.y / d);
    }

    public static Vector2D operator /(float d, Vector2D a)
    {
        return new Vector2D(a.x / d, a.y / d);
    }

    public static Vector2D operator *(Vector2D a, float d)
    {
        return new Vector2D(a.x * d, a.y * d);
    }

    public static Vector2D operator *(float d, Vector2D a)
    {
        return new Vector2D(a.x * d, a.y * d);
    }
    #endregion

}//END VECTOR2D CLASS


